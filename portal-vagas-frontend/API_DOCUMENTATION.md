# Documentação da API - Portal de Vagas

API RESTful para gerenciamento de vagas de emprego, construída com Python e FastAPI.

---

## Informações Gerais

**Base URL**: `http://localhost:8000`

**Autenticação**: Esta API não requer autenticação.

**Content-Type**: `application/json`

**Charset**: UTF-8

---

## Modelo de Dados

### Vaga

Estrutura de dados que representa uma vaga de emprego.

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `id` | `integer` | Não (gerado automaticamente) | Identificador único da vaga |
| `titulo` | `string` | Sim | Título da vaga |
| `empresa` | `string` | Sim | Nome da empresa |
| `link` | `string` | Sim | URL da vaga |
| `origem` | `string` | Sim | Origem/fonte da vaga (ex: LinkedIn, Gupy) |
| `localizacao` | `string` | Não | Localização da vaga |
| `senioridade` | `string` | Não | Nível de senioridade (ex: Júnior, Pleno, Sênior) |
| `data_publicacao` | `string` | Não | Data de publicação da vaga (formato: YYYY-MM-DD) |

**Exemplo de objeto Vaga:**

```json
{
  "id": 1,
  "titulo": "Desenvolvedor Python Sênior",
  "empresa": "Tech Company LTDA",
  "link": "https://exemplo.com/vaga/123",
  "origem": "LinkedIn",
  "localizacao": "São Paulo, SP - Remoto",
  "senioridade": "Sênior",
  "data_publicacao": "2025-11-20"
}
```

---

## Endpoints

### 1. Listar Todas as Vagas

Retorna uma lista com todas as vagas cadastradas no sistema.

**Endpoint**: `GET /vagas`

**Parâmetros**: Nenhum

**Response**:
- **Status Code**: `200 OK`
- **Body**: Array de objetos `Vaga`

**Exemplo de Requisição:**

```bash
curl -X GET "http://localhost:8000/vagas"
```

**Exemplo de Response:**

```json
[
  {
    "id": 1,
    "titulo": "Desenvolvedor Python Sênior",
    "empresa": "Tech Company LTDA",
    "link": "https://exemplo.com/vaga/123",
    "origem": "LinkedIn",
    "localizacao": "São Paulo, SP - Remoto",
    "senioridade": "Sênior",
    "data_publicacao": "2025-11-20"
  },
  {
    "id": 2,
    "titulo": "Engenheiro de Dados",
    "empresa": "Data Corp",
    "link": "https://exemplo.com/vaga/456",
    "origem": "Gupy",
    "localizacao": "Rio de Janeiro, RJ",
    "senioridade": "Pleno",
    "data_publicacao": "2025-11-19"
  }
]
```

---

### 2. Cadastrar Nova Vaga

Cria uma nova vaga no sistema.

**Endpoint**: `POST /vagas`

**Headers**:
```
Content-Type: application/json
```

**Request Body**: Objeto `Vaga` (sem o campo `id`)

**Response**:
- **Status Code**: `201 Created`
- **Body**: Objeto `Vaga` criado (com `id` gerado)

**Validações**:
- `titulo`: Campo obrigatório (string)
- `empresa`: Campo obrigatório (string)
- `link`: Campo obrigatório (string, deve ser uma URL válida)
- `origem`: Campo obrigatório (string)
- `localizacao`: Campo opcional (string)
- `senioridade`: Campo opcional (string)
- `data_publicacao`: Campo opcional (string, formato de data)

**Exemplo de Requisição:**

```bash
curl -X POST "http://localhost:8000/vagas" \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Desenvolvedor Python Sênior",
    "empresa": "Tech Company LTDA",
    "link": "https://exemplo.com/vaga/123",
    "origem": "LinkedIn",
    "localizacao": "São Paulo, SP - Remoto",
    "senioridade": "Sênior",
    "data_publicacao": "2025-11-20"
  }'
```

**Exemplo de Response:**

```json
{
  "id": 1,
  "titulo": "Desenvolvedor Python Sênior",
  "empresa": "Tech Company LTDA",
  "link": "https://exemplo.com/vaga/123",
  "origem": "LinkedIn",
  "localizacao": "São Paulo, SP - Remoto",
  "senioridade": "Sênior",
  "data_publicacao": "2025-11-20"
}
```

---

## Códigos de Status HTTP

| Código | Descrição | Quando ocorre |
|--------|-----------|---------------|
| `200` | OK | Requisição GET bem-sucedida |
| `201` | Created | Recurso criado com sucesso (POST) |
| `400` | Bad Request | Dados inválidos ou campos obrigatórios faltando |
| `422` | Unprocessable Entity | Erro de validação dos dados |
| `500` | Internal Server Error | Erro interno do servidor |

---

## Exemplos de Uso

### Python com requests

```python
import requests

# Listar todas as vagas
response = requests.get("http://localhost:8000/vagas")
vagas = response.json()
print(vagas)

# Cadastrar nova vaga
nova_vaga = {
    "titulo": "Desenvolvedor Python Sênior",
    "empresa": "Tech Company LTDA",
    "link": "https://exemplo.com/vaga/123",
    "origem": "LinkedIn",
    "localizacao": "São Paulo, SP - Remoto",
    "senioridade": "Sênior",
    "data_publicacao": "2025-11-20"
}

response = requests.post(
    "http://localhost:8000/vagas",
    json=nova_vaga
)

if response.status_code == 201:
    vaga_criada = response.json()
    print(f"Vaga criada com ID: {vaga_criada['id']}")
else:
    print(f"Erro: {response.status_code}")
```

### JavaScript com fetch

```javascript
// Listar todas as vagas
fetch("http://localhost:8000/vagas")
  .then(response => response.json())
  .then(vagas => console.log(vagas))
  .catch(error => console.error(error));

// Cadastrar nova vaga
const novaVaga = {
  titulo: "Desenvolvedor Python Sênior",
  empresa: "Tech Company LTDA",
  link: "https://exemplo.com/vaga/123",
  origem: "LinkedIn",
  localizacao: "São Paulo, SP - Remoto",
  senioridade: "Sênior",
  data_publicacao: "2025-11-20"
};

fetch("http://localhost:8000/vagas", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(novaVaga)
})
  .then(response => response.json())
  .then(vaga => console.log("Vaga criada:", vaga))
  .catch(error => console.error("Erro:", error));
```

### cURL

```bash
# Listar todas as vagas
curl -X GET "http://localhost:8000/vagas"

# Cadastrar nova vaga
curl -X POST "http://localhost:8000/vagas" \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Desenvolvedor Python Sênior",
    "empresa": "Tech Company LTDA",
    "link": "https://exemplo.com/vaga/123",
    "origem": "LinkedIn",
    "localizacao": "São Paulo, SP - Remoto",
    "senioridade": "Sênior",
    "data_publicacao": "2025-11-20"
  }'
```

---

## Configuração CORS

Para permitir que aplicações frontend acessem a API de diferentes origens, é necessário configurar o CORS no FastAPI:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, especifique as origens permitidas
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**Nota**: Em produção, substitua `allow_origins=["*"]` por uma lista específica de origens permitidas para maior segurança.

---

## Implementação de Referência (FastAPI)

Exemplo básico de implementação dos endpoints no FastAPI:

```python
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, List

app = FastAPI(title="Portal de Vagas API")

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelo de dados
class Vaga(BaseModel):
    titulo: str = Field(index=True)
    empresa: str
    link: str
    origem: str
    localizacao: Optional[str] = None
    senioridade: Optional[str] = None
    data_publicacao: Optional[str] = None

class VagaResponse(Vaga):
    id: int

# Armazenamento em memória (substituir por banco de dados em produção)
vagas_db: List[VagaResponse] = []
next_id = 1

@app.get("/vagas", response_model=List[VagaResponse])
async def listar_vagas():
    """Retorna todas as vagas cadastradas"""
    return vagas_db

@app.post("/vagas", response_model=VagaResponse, status_code=201)
async def criar_vaga(vaga: Vaga):
    """Cria uma nova vaga"""
    global next_id
    
    vaga_response = VagaResponse(
        id=next_id,
        **vaga.dict()
    )
    
    vagas_db.append(vaga_response)
    next_id += 1
    
    return vaga_response

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

---

## Notas Adicionais

- Todos os endpoints retornam dados no formato JSON
- A API aceita e retorna dados em UTF-8
- Campos opcionais podem ser omitidos ou enviados como `null`
- O campo `id` é gerado automaticamente pelo backend e não deve ser enviado no POST
- Para datas, utilize o formato ISO 8601 (YYYY-MM-DD)
- Em produção, recomenda-se implementar:
  - Autenticação e autorização
  - Rate limiting
  - Validação adicional de URLs
  - Paginação para o endpoint GET
  - Logging de requisições
  - Tratamento de erros mais robusto

---

**Documentação gerada para o Portal de Vagas API**
