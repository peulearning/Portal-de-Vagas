from fastapi import FastAPI
from contextlib import asynccontextmanager

from .database import create_db_and_tables

#--------------------------------------------

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    print("INFO : Banco de dados e tabelas verificandos/criados. 👍")

    yield
    print("INFO : Finalizando aplicação. 👋")


#--------------------------------------------

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

