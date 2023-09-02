use std::{collections::HashMap, env};

use actix_web::{get, HttpResponse, Responder, post, web::{Data, ReqData, self}, delete, put, patch};
use actix_web_jsonschema::Json;
use chrono::{Utc, Local, Duration};
use jsonwebtoken::{encode, EncodingKey, Header};
use mysql::{prelude::Queryable, params, Value};
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use validator::Validate;
use sha2::{Sha256, Digest};

use crate::{AppState, auth::validate::Claims};

#[derive(Deserialize, Serialize, Validate, JsonSchema)]
struct RegisterSchema {
    #[validate(length(min = 3, max = 255))]
    indicative: String,
    #[validate(length(min = 3, max = 255))]
    password: String,
    #[validate(length(max = 255))]
    city: String,
    #[validate(length(max = 255))]
    postal_code: String,
    #[validate(length(max = 255))]
    address: String,
    #[validate(length(max = 255))]
    description: String,
    #[validate(range(min = 0, max = 99))]
    ranks: u32
}

#[derive(Deserialize, Serialize, Validate, JsonSchema)]
struct LoginSchema {
    #[validate(length(min = 3, max = 255))]
    indicative: String,
    #[validate(length(min = 3, max = 255))]
    password: String
}

#[derive(Deserialize, Serialize, Validate, JsonSchema)]
struct UpdateSchema {
    #[validate(length(min = 3, max = 255))]
    indicative: Option<String>,
    #[validate(length(min = 3, max = 255))]
    password: Option<String>,
    #[validate(length(max = 255))]
    city: Option<String>,
    #[validate(length(max = 255))]
    postal_code: Option<String>,
    #[validate(length(max = 255))]
    address: Option<String>,
    #[validate(length(max = 255))]
    description: Option<String>,
    #[validate(range(min = 0, max = 99))]
    ranks: Option<u32>
}

#[derive(Deserialize, Serialize)]
struct User {
    id: u32,
    indicative: String,
    create_time: String,
    city: String,
    postal_code: String,
    address: String,
    description: String,
    ranks: u32
}

enum Ranks {
    ADMIN = 99,
    SUSPENDED = 0,
    USER = 1
}

#[post("/")]
async fn create_user(info: Json<RegisterSchema>, req_user: Option<ReqData<Claims>>, data: Data<AppState>) -> impl Responder {
    let mut conn = data.db.get_conn().unwrap();

    match req_user {
        Some(user) => {
            let stmt = conn.prep("SELECT * FROM user WHERE id = :id").unwrap();
            let params = params! {
                "id" => user.id
            };

            let result = conn.exec_first::<(u32, String, String, Value, String, String, String, String, u32), _, _>(stmt, params);

            match result {
                Ok(Some(res)) => {
                    if res.8 == Ranks::SUSPENDED as u32 {
                        let mut res = HashMap::new();
                        res.insert("result", "Your account is suspended");

                        return HttpResponse::Unauthorized().json(res);
                    }

                    if res.8 != Ranks::ADMIN as u32 {
                        let mut res = HashMap::new();
                        res.insert("result", "You aren't admin");

                        return HttpResponse::Unauthorized().json(res);
                    }
                },
                Ok(None) => {
                    let mut res = HashMap::new();
                    res.insert("error", "User not found");

                    return HttpResponse::NotFound().json(res);
                }
                Err(err) => {
                    eprintln!("Error executing query: {}", err);

                    let mut res = HashMap::new();
                    res.insert("error", "Please contact the administrator");

                    return HttpResponse::InternalServerError().json(res);
                }
            }
        },
        _ => {
            let mut res = HashMap::new();
            res.insert("error", "Unable to verify identity");

            return HttpResponse::Unauthorized().json(res);
        }
    }

    let stmt = conn.prep("INSERT INTO user (indicative, password, create_time, city, postal_code, address, description, ranks) VALUES (:indicative, :password, :create_time, :city, :postal_code, :address, :description, :ranks)").unwrap();
    let params = params! {
        "indicative" => &info.indicative,
        "password" => hex::encode(Sha256::digest(&info.password)),
        "create_time" => Utc::now().format("%Y-%m-%d %H:%M:%S").to_string(),
        "city" => &info.city,
        "postal_code" => &info.postal_code,
        "address" => &info.address,
        "description" => &info.description,
        "ranks" => &info.ranks
    };

    match conn.exec_drop(stmt, params) {
        Ok(_) => HttpResponse::Ok().json(&info.0),
        Err(err) => {
            eprintln!("Error executing query: {}", err);

            let mut res = HashMap::new();
            res.insert("error", "Please contact the administrator");

            HttpResponse::InternalServerError().json(res)
        }
    }
}

#[get("/")]
async fn get_users(req_user: Option<ReqData<Claims>>, data: Data<AppState>) -> impl Responder {
    let mut conn = data.db.get_conn().unwrap();

    match req_user {
        Some(user) => {
            let stmt = conn.prep("SELECT * FROM user WHERE id = :id").unwrap();
            let params = params! {
                "id" => user.id
            };

            let result = conn.exec_first::<(u32, String, String, Value, String, String, String, String, u32), _, _>(stmt, params);

            match result {
                Ok(Some(res)) => {
                    if res.8 == Ranks::SUSPENDED as u32 {
                        let mut res = HashMap::new();
                        res.insert("result", "Your account is suspended");

                        return HttpResponse::Unauthorized().json(res);
                    }
                },
                Ok(None) => {
                    let mut res = HashMap::new();
                    res.insert("error", "User not found");

                    return HttpResponse::NotFound().json(res);
                }
                Err(err) => {
                    eprintln!("Error executing query: {}", err);

                    let mut res = HashMap::new();
                    res.insert("error", "Please contact the administrator");

                    return HttpResponse::InternalServerError().json(res);
                }
            }
        },
        _ => {
            let mut res = HashMap::new();
            res.insert("error", "Unable to verify identity");

            return HttpResponse::Unauthorized().json(res);
        }
    }

    let result = conn.query_map("SELECT id, indicative, create_time, city, postal_code, address, description, ranks FROM user", |(id, indicative, create_time, city, postal_code, address, description, ranks)| {
        User {
            id,
            indicative,
            create_time,
            city,
            postal_code,
            address,
            description,
            ranks
        }
    });

    match result {
        Ok(users) => {
            if users.is_empty() {
                let mut res = HashMap::new();
                res.insert("error", "User not found");

                HttpResponse::NotFound().json(res)
            } else {
                HttpResponse::Ok().json(users)
            }
        }
        Err(err) => {
            eprintln!("Error executing query: {}", err);

            let mut res = HashMap::new();
            res.insert("error", "Please contact the administrator");

            HttpResponse::InternalServerError().json(res)
        }
    }
}

#[get("/{id}")]
async fn get_user(path: web::Path<String>, req_user: Option<ReqData<Claims>>, data: Data<AppState>) -> impl Responder {
    let mut conn = data.db.get_conn().unwrap();

    let mut id = path.into_inner();

    match req_user {
        Some(user) => {
            let stmt = conn.prep("SELECT * FROM user WHERE id = :id").unwrap();
            let params = params! {
                "id" => user.id
            };

            let result = conn.exec_first::<(u32, String, String, Value, String, String, String, String, u32), _, _>(stmt, params);

            match result {
                Ok(Some(res)) => {
                    if res.8 == Ranks::SUSPENDED as u32 {
                        let mut res = HashMap::new();
                        res.insert("result", "Your account is suspended");

                        return HttpResponse::Unauthorized().json(res);
                    }

                    if id == "@me" {
                        id = user.id.to_string();
                    }
                },
                Ok(None) => {
                    let mut res = HashMap::new();
                    res.insert("error", "User not found");

                    return HttpResponse::NotFound().json(res);
                }
                Err(err) => {
                    eprintln!("Error executing query: {}", err);

                    let mut res = HashMap::new();
                    res.insert("error", "Please contact the administrator");

                    return HttpResponse::InternalServerError().json(res);
                }
            }
        },
        _ => {
            let mut res = HashMap::new();
            res.insert("error", "Unable to verify identity");

            return HttpResponse::Unauthorized().json(res);
        }
    }

    let stmt = conn.prep("SELECT * FROM user WHERE id = :id").unwrap();
    let params = params! {
        "id" => id
    };

    let result = conn.exec_first::<(u32, String, String, Value, String, String, String, String, u32), _, _>(stmt, params);

    match result {
        Ok(Some(row)) => {
            HttpResponse::Ok().json(User {
                id: row.0,
                indicative: row.1,
                create_time: row.3.as_sql(false),
                city: row.4,
                postal_code: row.5,
                address: row.6,
                description: row.7,
                ranks: row.8
            })
        }
        Ok(None) => {
            let mut res = HashMap::new();
            res.insert("error", "User not found");

            HttpResponse::NotFound().json(res)
        }
        Err(err) => {
            eprintln!("Error executing query: {}", err);

            let mut res = HashMap::new();
            res.insert("error", "Please contact the administrator");

            HttpResponse::InternalServerError().json(res)
        }
    }
}

#[delete("/{id}")]
async fn delete_user(path: web::Path<String>, req_user: Option<ReqData<Claims>>, data: Data<AppState>) -> impl Responder {
    let mut conn = data.db.get_conn().unwrap();

    let id = path.into_inner();

    match req_user {
        Some(user) => {
            let stmt = conn.prep("SELECT * FROM user WHERE id = :id").unwrap();
            let params = params! {
                "id" => user.id
            };

            let result = conn.exec_first::<(u32, String, String, Value, String, String, String, String, u32), _, _>(stmt, params);

            match result {
                Ok(Some(res)) => {
                    if res.8 == Ranks::SUSPENDED as u32 {
                        let mut res = HashMap::new();
                        res.insert("result", "Your account is suspended");

                        return HttpResponse::Unauthorized().json(res);
                    }

                    if res.8 != Ranks::ADMIN as u32 {
                        let mut res = HashMap::new();
                        res.insert("result", "You aren't admin");

                        return HttpResponse::Unauthorized().json(res);
                    }
                },
                Ok(None) => {
                    let mut res = HashMap::new();
                    res.insert("error", "User not found");

                    return HttpResponse::NotFound().json(res);
                }
                Err(err) => {
                    eprintln!("Error executing query: {}", err);

                    let mut res = HashMap::new();
                    res.insert("error", "Please contact the administrator");

                    return HttpResponse::InternalServerError().json(res);
                }
            }
        },
        _ => {
            let mut res = HashMap::new();
            res.insert("error", "Unable to verify identity");

            return HttpResponse::Unauthorized().json(res);
        }
    }

    let stmt = conn.prep("DELETE FROM user WHERE id = :id").unwrap();
    let params = params! {
        "id" => id
    };

    match conn.exec_drop(stmt, params) {
        Ok(_) => {
            let mut res = HashMap::new();
            res.insert("result", "Account has been successfully deleted");

            return HttpResponse::Ok().json(res);
        },
        Err(err) => {
            eprintln!("Error executing query: {}", err);

            let mut res = HashMap::new();
            res.insert("error", "Please contact the administrator");

            HttpResponse::InternalServerError().json(res)
        }
    }
}

#[patch("/{id}")]
async fn update_user(path: web::Path<String>, info: Json<UpdateSchema>, req_user: Option<ReqData<Claims>>, data: Data<AppState>) -> impl Responder {
    let mut conn = data.db.get_conn().unwrap();

    let mut id = path.into_inner();

    let mut is_admin = false;

    match req_user {
        Some(user) => {
            let stmt = conn.prep("SELECT * FROM user WHERE id = :id").unwrap();
            let params = params! {
                "id" => user.id
            };

            let result = conn.exec_first::<(u32, String, String, Value, String, String, String, String, u32), _, _>(stmt, params);

            match result {
                Ok(Some(res)) => {
                    if res.8 == Ranks::SUSPENDED as u32 {
                        let mut res = HashMap::new();
                        res.insert("result", "Your account is suspended");

                        return HttpResponse::Unauthorized().json(res);
                    }

                    if res.8 == Ranks::ADMIN as u32 {
                        is_admin = true;
                    } else {
                        is_admin = false;
                    }

                    if !is_admin && id != "@me" {
                        let mut res = HashMap::new();
                        res.insert("result", "You aren't admin");

                        return HttpResponse::Unauthorized().json(res);
                    }

                    if !is_admin {
                        if info.indicative != None || info.ranks != None {
                            let mut res = HashMap::new();
                            res.insert("result", "You can't update indicative or ranks if you're not admin");

                            return HttpResponse::Unauthorized().json(res);
                        }
                    }

                    if id == "@me" {
                        id = user.id.to_string();
                    }
                },
                Ok(None) => {
                    let mut res = HashMap::new();
                    res.insert("error", "User not found");

                    return HttpResponse::NotFound().json(res);
                }
                Err(err) => {
                    eprintln!("Error executing query: {}", err);

                    let mut res = HashMap::new();
                    res.insert("error", "Please contact the administrator");

                    return HttpResponse::InternalServerError().json(res);
                }
            }
        },
        _ => {
            let mut res = HashMap::new();
            res.insert("error", "Unable to verify identity");

            return HttpResponse::Unauthorized().json(res);
        }
    }

    let mut query = "UPDATE user SET".to_owned();
    let mut params: Vec<Value> = Vec::new();

    if is_admin {
        if let Some(indicative) = info.indicative.to_owned() {
            query += " indicative = ?,";
            params.push(Value::from(indicative));
        }
    }

    if let Some(password) = info.password.to_owned() {
        query += " password = ?,";
        params.push(Value::from(hex::encode(Sha256::digest(password))));
    }

    if let Some(city) = info.city.to_owned() {
        query += " city = ?,";
        params.push(Value::from(city));
    }

    if let Some(postal_code) = info.city.to_owned() {
        query += " postal_code = ?,";
        params.push(Value::from(postal_code));
    }

    if let Some(address) = info.address.to_owned() {
        query += " address = ?,";
        params.push(Value::from(address));
    }

    if let Some(description) = info.description.to_owned() {
        query += " description = ?,";
        params.push(Value::from(description));
    }

    if is_admin {
        if let Some(ranks) = info.ranks.to_owned() {
            query += " ranks = ?,";
            params.push(Value::from(ranks));
        }
    }

    if query.ends_with(',') {
        query.pop();
    }

    query += " WHERE id = ?";
    params.push(Value::from(id));

    let stmt = conn.prep(query).unwrap();
    
    match conn.exec_drop(stmt, params) {
        Ok(_) => HttpResponse::Ok().json(&info.0),
        Err(err) => {
            eprintln!("Error executing query: {}", err);

            let mut res = HashMap::new();
            res.insert("error", "Please contact the administrator");

            HttpResponse::InternalServerError().json(res)
        }
    }
}

#[post("/login")]
async fn login(info: Json<LoginSchema>, data: Data<AppState>) -> impl Responder {
    let mut conn = data.db.get_conn().unwrap();

    let stmt = conn.prep("SELECT * FROM user WHERE indicative = :indicative").unwrap();
    let params = params! {
        "indicative" => &info.indicative
    };

    let result = conn.exec_first::<(u32, String, String, Value, String, String, String, String, u32), _, _>(stmt, params);

    match result {
        Ok(Some(row)) => {
            if row.2 == hex::encode(Sha256::digest(&info.password)) {
                let claims = Claims {
                    exp: (Local::now() + Duration::days(1)).timestamp() as usize,
                    id: row.0
                };

                let token = encode(&Header::default(), &claims, &EncodingKey::from_secret(env::var("JWT_SECRET").unwrap().as_str().as_ref()));

                let mut res = HashMap::new();
                res.insert("token", token.unwrap());
                
                HttpResponse::Ok().json(res)
            } else {
                let mut res = HashMap::new();
                res.insert("error", "Password is wrong");

                HttpResponse::BadRequest().json(res)
            }
        }
        Ok(None) => {
            let mut res = HashMap::new();
            res.insert("error", "User not found");

            HttpResponse::NotFound().json(res)
        }
        Err(err) => {
            eprintln!("Error executing query: {}", err);

            let mut res = HashMap::new();
            res.insert("error", "Please contact the administrator");

            HttpResponse::InternalServerError().json(res)
        }
    }
}
