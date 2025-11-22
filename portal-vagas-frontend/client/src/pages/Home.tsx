import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Briefcase, MapPin, Building2, Calendar, ExternalLink, Plus, Search, Loader2, BookOpen } from "lucide-react";
import { APP_TITLE } from "@/const";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface Vaga {
  id?: number;
  titulo: string;
  empresa: string;
  link: string;
  origem: string;
  localizacao?: string;
  senioridade?: string;
  data_publicacao?: string;
}

export default function Home() {
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  // Estado do formulário
  const [formData, setFormData] = useState<Vaga>({
    titulo: "",
    empresa: "",
    link: "",
    origem: "",
    localizacao: "",
    senioridade: "",
    data_publicacao: "",
  });

  // Carregar vagas
  useEffect(() => {
    fetchVagas();
  }, []);

  const fetchVagas = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/vagas");
      if (!response.ok) throw new Error("Erro ao carregar vagas");
      const data = await response.json();
      setVagas(data);
    } catch (error) {
      toast.error("Erro ao carregar vagas. Verifique se a API está rodando.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar vagas
  const vagasFiltradas = vagas.filter((vaga) => {
    const termo = searchTerm.toLowerCase();
    return (
      vaga.titulo.toLowerCase().includes(termo) ||
      vaga.empresa.toLowerCase().includes(termo) ||
      (vaga.localizacao && vaga.localizacao.toLowerCase().includes(termo)) ||
      (vaga.senioridade && vaga.senioridade.toLowerCase().includes(termo))
    );
  });

  // Submeter nova vaga
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.titulo || !formData.empresa || !formData.link || !formData.origem) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch("http://localhost:8000/vagas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Erro ao cadastrar vaga");

      toast.success("Vaga cadastrada com sucesso!");
      setIsDialogOpen(false);
      
      // Resetar formulário
      setFormData({
        titulo: "",
        empresa: "",
        link: "",
        origem: "",
        localizacao: "",
        senioridade: "",
        data_publicacao: "",
      });
      
      // Recarregar vagas
      fetchVagas();
    } catch (error) {
      toast.error("Erro ao cadastrar vaga. Tente novamente.");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Briefcase className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">{APP_TITLE}</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" asChild className="gap-2">
                <a href="/docs">
                  <BookOpen className="h-4 w-4" />
                  API Docs
                </a>
              </Button>
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Nova Vaga
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Cadastrar Nova Vaga</DialogTitle>
                  <DialogDescription>
                    Preencha os dados da vaga. Campos com * são obrigatórios.
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="titulo">Título *</Label>
                    <Input
                      id="titulo"
                      placeholder="Ex: Desenvolvedor Python Sênior"
                      value={formData.titulo}
                      onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="empresa">Empresa *</Label>
                    <Input
                      id="empresa"
                      placeholder="Ex: Tech Company LTDA"
                      value={formData.empresa}
                      onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="link">Link da Vaga *</Label>
                    <Input
                      id="link"
                      type="url"
                      placeholder="https://exemplo.com/vaga"
                      value={formData.link}
                      onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="origem">Origem *</Label>
                    <Input
                      id="origem"
                      placeholder="Ex: LinkedIn, Gupy, Site da empresa"
                      value={formData.origem}
                      onChange={(e) => setFormData({ ...formData, origem: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="localizacao">Localização</Label>
                      <Input
                        id="localizacao"
                        placeholder="Ex: São Paulo, SP - Remoto"
                        value={formData.localizacao}
                        onChange={(e) => setFormData({ ...formData, localizacao: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="senioridade">Senioridade</Label>
                      <Input
                        id="senioridade"
                        placeholder="Ex: Júnior, Pleno, Sênior"
                        value={formData.senioridade}
                        onChange={(e) => setFormData({ ...formData, senioridade: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="data_publicacao">Data de Publicação</Label>
                    <Input
                      id="data_publicacao"
                      type="date"
                      value={formData.data_publicacao}
                      onChange={(e) => setFormData({ ...formData, data_publicacao: e.target.value })}
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button type="submit" disabled={submitting} className="flex-1">
                      {submitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Cadastrando...
                        </>
                      ) : (
                        "Cadastrar Vaga"
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                      disabled={submitting}
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar por título, empresa, localização ou senioridade..."
              className="pl-10 h-12 text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Carregando vagas...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && vagasFiltradas.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <Briefcase className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Nenhuma vaga encontrada</h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm
                ? "Tente ajustar seus filtros de busca"
                : "Seja o primeiro a cadastrar uma vaga!"}
            </p>
            {!searchTerm && (
              <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Cadastrar Primeira Vaga
              </Button>
            )}
          </div>
        )}

        {/* Vagas Grid */}
        {!loading && vagasFiltradas.length > 0 && (
          <>
            <div className="mb-4 text-sm text-muted-foreground">
              {vagasFiltradas.length} {vagasFiltradas.length === 1 ? "vaga encontrada" : "vagas encontradas"}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vagasFiltradas.map((vaga, index) => (
                <Card key={vaga.id || index} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg line-clamp-2">{vaga.titulo}</CardTitle>
                      {vaga.senioridade && (
                        <Badge variant="secondary" className="shrink-0">
                          {vaga.senioridade}
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      {vaga.empresa}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    {vaga.localizacao && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {vaga.localizacao}
                      </div>
                    )}
                    
                    {vaga.data_publicacao && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {new Date(vaga.data_publicacao).toLocaleDateString("pt-BR")}
                      </div>
                    )}
                    
                    <div className="pt-2">
                      <Badge variant="outline" className="text-xs">
                        {vaga.origem}
                      </Badge>
                    </div>
                    
                    <Button
                      asChild
                      className="w-full gap-2 mt-4"
                      variant="default"
                    >
                      <a href={vaga.link} target="_blank" rel="noopener noreferrer">
                        Ver Vaga
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm mt-16">
        <div className="container py-6 text-center text-sm text-muted-foreground">
          <p>Portal de Vagas - Conectando talentos a oportunidades</p>
        </div>
      </footer>
    </div>
  );
}
