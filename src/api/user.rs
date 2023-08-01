use std::collections::HashMap;

use actix_web::{get, HttpResponse, Responder, post, web::Data};
use actix_web_jsonschema::Json;
use chrono::Utc;
use mysql::{prelude::Queryable, params};
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use validator::Validate;
use sha2::{Sha256, Digest};

use crate::AppState;

/*
 * Api account register schema
 */
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
    #[validate(length(max = 255))]
    ranks: String
}

#[post("/")]
async fn register(info: Json<RegisterSchema>, data: Data<AppState>) -> impl Responder {
    let mut conn = data.db.get_conn().unwrap();

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
