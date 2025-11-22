import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function ApiDocs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container py-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div className="flex items-center gap-3">
              <Code className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Documentação da API</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8 max-w-5xl">
        {/* Introdução */}
        <section className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>API de Vagas - FastAPI</CardTitle>
              <CardDescription>
                API RESTful para gerenciamento de vagas de emprego. Construída com Python e FastAPI.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Base URL</h3>
                <code className="bg-muted px-3 py-1 rounded text-sm">http://localhost:8000</code>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Autenticação</h3>
                <p className="text-sm text-muted-foreground">Esta API não requer autenticação.</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Modelo de Dados */}
        <section className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Modelo de Dados: Vaga</CardTitle>
              <CardDescription>Estrutura de dados de uma vaga de emprego</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`{
  "titulo": "string",           // Obrigatório - Título da vaga
  "empresa": "string",          // Obrigatório - Nome da empresa
  "link": "string",             // Obrigatório - URL da vaga
  "origem": "string",           // Obrigatório - Origem da vaga
  "localizacao": "string",      // Opcional - Localização
  "senioridade": "string",      // Opcional - Nível de senioridade
  "data_publicacao": "string"   // Opcional - Data de publicação
}`}</pre>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* GET /vagas */}
        <section className="mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Badge className="bg-green-600 hover:bg-green-700">GET</Badge>
                <CardTitle className="text-xl">/vagas</CardTitle>
              </div>
              <CardDescription>Listar todas as vagas cadastradas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Request */}
              <div>
                <h3 className="font-semibold mb-3">Requisição</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm font-mono">GET http://localhost:8000/vagas</p>
                </div>
              </div>

              {/* Response */}
              <div>
                <h3 className="font-semibold mb-3">Resposta (200 OK)</h3>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`[
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
]`}</pre>
                </div>
              </div>

              {/* Exemplo cURL */}
              <div>
                <h3 className="font-semibold mb-3">Exemplo com cURL</h3>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>curl -X GET "http://localhost:8000/vagas"</pre>
                </div>
              </div>

              {/* Exemplo Python */}
              <div>
                <h3 className="font-semibold mb-3">Exemplo com Python</h3>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`import requests

response = requests.get("http://localhost:8000/vagas")
vagas = response.json()
print(vagas)`}</pre>
                </div>
              </div>

              {/* Exemplo JavaScript */}
              <div>
                <h3 className="font-semibold mb-3">Exemplo com JavaScript</h3>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`fetch("http://localhost:8000/vagas")
  .then(response => response.json())
  .then(vagas => console.log(vagas))
  .catch(error => console.error(error));`}</pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* POST /vagas */}
        <section className="mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Badge className="bg-blue-600 hover:bg-blue-700">POST</Badge>
                <CardTitle className="text-xl">/vagas</CardTitle>
              </div>
              <CardDescription>Cadastrar uma nova vaga</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Request */}
              <div>
                <h3 className="font-semibold mb-3">Requisição</h3>
                <div className="bg-muted p-4 rounded-lg space-y-3">
                  <p className="text-sm font-mono">POST http://localhost:8000/vagas</p>
                  <div>
                    <p className="text-sm font-semibold mb-2">Headers:</p>
                    <p className="text-sm font-mono">Content-Type: application/json</p>
                  </div>
                </div>
              </div>

              {/* Request Body */}
              <div>
                <h3 className="font-semibold mb-3">Body (JSON)</h3>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`{
  "titulo": "Desenvolvedor Python Sênior",
  "empresa": "Tech Company LTDA",
  "link": "https://exemplo.com/vaga/123",
  "origem": "LinkedIn",
  "localizacao": "São Paulo, SP - Remoto",
  "senioridade": "Sênior",
  "data_publicacao": "2025-11-20"
}`}</pre>
                </div>
              </div>

              {/* Response */}
              <div>
                <h3 className="font-semibold mb-3">Resposta (201 Created)</h3>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`{
  "id": 1,
  "titulo": "Desenvolvedor Python Sênior",
  "empresa": "Tech Company LTDA",
  "link": "https://exemplo.com/vaga/123",
  "origem": "LinkedIn",
  "localizacao": "São Paulo, SP - Remoto",
  "senioridade": "Sênior",
  "data_publicacao": "2025-11-20"
}`}</pre>
                </div>
              </div>

              {/* Validações */}
              <div>
                <h3 className="font-semibold mb-3">Validações</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li><strong>titulo</strong>: Campo obrigatório (string)</li>
                  <li><strong>empresa</strong>: Campo obrigatório (string)</li>
                  <li><strong>link</strong>: Campo obrigatório (string, deve ser uma URL válida)</li>
                  <li><strong>origem</strong>: Campo obrigatório (string)</li>
                  <li><strong>localizacao</strong>: Campo opcional (string)</li>
                  <li><strong>senioridade</strong>: Campo opcional (string)</li>
                  <li><strong>data_publicacao</strong>: Campo opcional (string, formato de data)</li>
                </ul>
              </div>

              {/* Exemplo cURL */}
              <div>
                <h3 className="font-semibold mb-3">Exemplo com cURL</h3>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`curl -X POST "http://localhost:8000/vagas" \\
  -H "Content-Type: application/json" \\
  -d '{
    "titulo": "Desenvolvedor Python Sênior",
    "empresa": "Tech Company LTDA",
    "link": "https://exemplo.com/vaga/123",
    "origem": "LinkedIn",
    "localizacao": "São Paulo, SP - Remoto",
    "senioridade": "Sênior",
    "data_publicacao": "2025-11-20"
  }'`}</pre>
                </div>
              </div>

              {/* Exemplo Python */}
              <div>
                <h3 className="font-semibold mb-3">Exemplo com Python</h3>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`import requests

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
    print(f"Erro: {response.status_code}")`}</pre>
                </div>
              </div>

              {/* Exemplo JavaScript */}
              <div>
                <h3 className="font-semibold mb-3">Exemplo com JavaScript</h3>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`const novaVaga = {
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
  .catch(error => console.error("Erro:", error));`}</pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Códigos de Status */}
        <section className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Códigos de Status HTTP</CardTitle>
              <CardDescription>Possíveis respostas da API</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Badge className="bg-green-600 hover:bg-green-700 shrink-0">200</Badge>
                  <div>
                    <p className="font-semibold">OK</p>
                    <p className="text-sm text-muted-foreground">Requisição bem-sucedida (GET)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className="bg-green-600 hover:bg-green-700 shrink-0">201</Badge>
                  <div>
                    <p className="font-semibold">Created</p>
                    <p className="text-sm text-muted-foreground">Recurso criado com sucesso (POST)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className="bg-yellow-600 hover:bg-yellow-700 shrink-0">400</Badge>
                  <div>
                    <p className="font-semibold">Bad Request</p>
                    <p className="text-sm text-muted-foreground">Dados inválidos ou faltando campos obrigatórios</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className="bg-red-600 hover:bg-red-700 shrink-0">500</Badge>
                  <div>
                    <p className="font-semibold">Internal Server Error</p>
                    <p className="text-sm text-muted-foreground">Erro interno do servidor</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CORS */}
        <section className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>CORS (Cross-Origin Resource Sharing)</CardTitle>
              <CardDescription>Configuração para requisições de diferentes origens</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Para permitir que o frontend acesse a API, certifique-se de que o CORS está configurado no FastAPI:
              </p>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, especifique as origens permitidas
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)`}</pre>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Notas Adicionais */}
        <section className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Notas Adicionais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <ul className="list-disc list-inside space-y-2">
                <li>A API retorna dados no formato JSON</li>
                <li>Todos os endpoints aceitam e retornam UTF-8</li>
                <li>Campos opcionais podem ser omitidos ou enviados como null</li>
                <li>O campo <code className="bg-muted px-1 py-0.5 rounded">id</code> é gerado automaticamente pelo backend</li>
                <li>Para datas, use o formato ISO 8601 (YYYY-MM-DD)</li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm mt-16">
        <div className="container py-6 text-center text-sm text-muted-foreground">
          <p>Documentação da API - Portal de Vagas</p>
        </div>
      </footer>
    </div>
  );
}
