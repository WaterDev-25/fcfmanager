mod api;
mod auth;

use actix_web::{App, HttpServer, web};
use actix_files::Files;
use actix_web_httpauth::middleware::HttpAuthentication;
use mysql::Pool;
use dotenv::dotenv;
use std::env;

use api::user::{create_user, get_users, login, get_user};
use auth::validate::validator;

pub struct AppState {
    db: Pool
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Load .env file
    dotenv().ok();

    // Connect to mysql database
    let pool = Pool::new(env::var("MYSQL_URI").unwrap().as_str());

    let data = web::Data::new(AppState {
        db: pool.unwrap()
    });

    HttpServer::new(move || {
        App::new()
            .app_data(data.clone())
            .service(
                web::scope("/api")
                .service(
                    web::scope("/user")
                        .wrap(HttpAuthentication::bearer(validator.clone()))
                        .service(create_user)
                        .service(get_users)
                        .service(get_user)
                )
                .service(login)
            )
            .service(Files::new("/", "./static").index_file("index.html"))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
