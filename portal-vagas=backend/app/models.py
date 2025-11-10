from sqlmodel import  SQLModel
from typing import Optional

# Estrutura base para as vagas (campos que me ineressam na extração)
class VagasBase(SQLModel):
    titulo: str
    empresa: str
    link: str
    origem: str

    localizacao: Optional[str] = None
    senioridade: Optional[str] = None
    data_publicacao : Optional[str] = None

# Modelo para criação da tabela de vagas
class Vaga(VagaBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

# Input da API
class VagaCreate(VagaBase):
    pass

# Output da API
class VagaRead(VagaBase):
    id: int
