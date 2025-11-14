
#Importações necessárias
from fastapi import FastAPI, Depends
from contextlib import asynccontextmanager
from sqlmodel import Session, select
from typing import List

from .database import create_db_and_tables, get_session
from .models import Vaga, VagaCreate, VagaRead

#--------------------------------------------


#----------------------- Função Lifespan
@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    print("INFO : Banco de dados e tabelas verificandos/criados. 👍")

    yield
    print("INFO : Finalizando aplicação. 👋")


#--------------------------------------------


#---------------------- CRIA INSTÂNCIA FastApi ---------
app = FastAPI(
    title="Portal de Vagas - Backend",
    description="API para gerenciamento de vagas de emprego.",
    version="1.0.0",
    lifespan=lifespan
)

#--------------------------------------------


#---------- Endpoint Raíz GET ----------------
@app.get("/")
def read_root():
    return {"Hello": "World"}

#-------------------- Endpoint Criar Vagas
@app.post("/vagas", response_model=VagaRead)
def create_vaga(*,
    session: Session = Depends(get_session),
    vaga_input: VagaCreate
):
    """
    Cria uma nova vaga no banco de dados.
    """
    print(f"INFO:     Recebido para criar vaga: {vaga_input.titulo}")

    # 1. Cria um objeto "Vaga" (o modelo da tabela)
    #    a partir do "VagaCreate" (o modelo de input)
    db_vaga = Vaga.model_validate(vaga_input)

    # 2. Adiciona o objeto à sessão do banco
    session.add(db_vaga)

    # 3. Confirma (commit) a transação para salvar no banco
    session.commit()

    # 4. Atualiza o objeto 'db_vaga' com os dados do banco
    #    (principalmente para pegar o 'id' que foi gerado)
    session.refresh(db_vaga)

    # 5. Retorna a vaga criada (será convertida para VagaRead)
    return db_vaga

@app.get("/vagas", response_model=List[VagaRead])
def read_vagas(*, session: Session = Depends(get_session)):
    """
    Retorna todas as vagas do banco de dados.
    """
    print("INFO:     Listando todas as vagas...")

    # 1. Cria uma consulta (query) para selecionar *todas* as vagas
    query = select(Vaga)

    # 2. Executa a consulta no banco usando a sessão
    vagas = session.exec(query).all()

    # 3. Retorna a lista de vagas
    # (O FastAPI vai converter para o formato List[VagaRead])
    return vagas