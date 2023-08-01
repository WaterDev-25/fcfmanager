use actix_web_httpauth::{extractors::{bearer::{BearerAuth, self}, AuthenticationError}};
use actix_web::{dev::ServiceRequest, HttpMessage, Result, Error};
use chrono::Local;
use jsonwebtoken::{DecodingKey, Validation, decode};
use serde::{Deserialize, Serialize};
use std::env;

#[derive(Deserialize, Serialize, Clone)]
pub struct Claims {
    pub exp: usize,
    pub id: u32
}

pub async fn validator(req: ServiceRequest, credentials: BearerAuth) -> Result<ServiceRequest, (Error, ServiceRequest)> {
    let token = credentials.token().to_owned();

    let decoding_key = DecodingKey::from_secret(env::var("JWT_SECRET").unwrap().as_str().as_ref());
    let validation = Validation::default();

    match decode::<Claims>(&token, &decoding_key, &validation) {
        Ok(val) => {
            if val.claims.exp < Local::now().timestamp() as usize {
                let config = req.app_data::<bearer::Config>().cloned().unwrap_or_default().scope("");

                Err((AuthenticationError::from(config).into(), req))
            } else {
                req.extensions_mut().insert(val.claims);
                Ok(req)
            }
        }
        Err(_) => {
            let config = req.app_data::<bearer::Config>().cloned().unwrap_or_default().scope("");

            Err((AuthenticationError::from(config).into(), req))
        }
    }
}
