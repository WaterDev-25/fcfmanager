mod api;

use actix_web::{App, HttpServer, web};
use actix_files::Files;
use mysql::Pool;
use dotenv::dotenv;
use std::env;

use api::user::register;

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
                        .service(register)
                )
            )
            .service(Files::new("/", "./static").index_file("index.html"))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
