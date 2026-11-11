# Raio-X do ENEM — Aulão em Juscimeira

Plataforma estática de apoio pedagógico para o ENEM, com foco em Ciências da Natureza, análise de repertório e revisão estratégica do 2º dia da prova, com extensão para o 1º dia e materiais complementares para revisão e acompanhamento pedagógico.

[![HTML5](https://img.shields.io/badge/HTML5-100%25-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![Chart.js](https://img.shields.io/badge/Chart.js-4.4.1-FF6384?logo=chart.js&logoColor=white)](https://www.chartjs.org/)

## Visão geral

Este repositório reúne um conjunto de páginas estáticas para apoio pedagógico ao ENEM, com foco em:

- análise de repertório e frequências históricas;
- revisão estratégica do 1º e 2º dia da prova;
- materiais para sala de aula e estudo individual;
- checklists para impressão e revisão prática;
- dashboard visual com UX pensada para estudantes, professores e contextos de aula.

A proposta central é transformar dados e repertórios em ferramenta útil, acessível e didática, com visual institucional e foco em tomada de decisão pedagógica.

## Objetivos do projeto

- facilitar a revisão de conteúdos de Ciências da Natureza;
- apresentar padrões históricos do ENEM por disciplina e tema;
- conectar teoria, competências e aplicação prática;
- apoiar aulas em grupo, revisão individual e estudos em contexto escolar;
- oferecer materiais de impressão e acompanhamento de progresso.

## Estrutura do repositório

```text
enem/
├── index.html                    # Página inicial e apresentação do projeto
├── primeiro-dia.html             # Painel analítico do 1º dia do ENEM
├── segundo-dia.html              # Painel analítico do 2º dia do ENEM
├── checklist-primeiro-dia.html  # Checklist imprimível do 1º dia
├── checklist.html                # Checklist imprimível do 2º dia
├── README.md                     # Documentação do projeto
├── LICENSE                       # Licença MIT
├── SPRINTS.md                    # Histórico de desenvolvimento
├── assets/
│   ├── css/
│   │   ├── base.css             # Tokens e reset base
│   │   ├── components.css       # Componentes visuais compartilhados
│   │   ├── pages.css            # Estilos para checklists e páginas internas
│   │   └── checklist.css        # Estilos específicos dos checklists
│   ├── js/
│   │   ├── app.js               # Lógica compartilhada da navegação e UX
│   │   ├── checklist.js         # Persistência de checklist e progresso
│   │   └── data/
│   ├── galeria/
│   │   └── README.md            # Instruções de publicação de fotos
│   ├── *.png                    # Logos e elementos visuais institucionais
│   └── *.jpg                    # Arquivos de imagem do projeto
├── docs/
│   ├── mapa_calor.csv           # Base de dados para mapas de calor
│   ├── mapeamento_temas_redacao_enem.csv
│   └── Plano de Aula Executivo...docx
├── .gitignore
└── .github/
```

## Arquitetura e boas práticas aplicadas

Este projeto foi reorganizado para reduzir acoplamento e facilitar manutenção, com os seguintes pilares:

### 1) Separação de responsabilidades
- HTML: estrutura semântica e conteúdo pedagógico;
- CSS: estilos visuais, componentes e responsividade;
- JavaScript: comportamento interativo, temas, checklist e navegação.

### 2) Modularização e escalabilidade
- tokens visuais centralizados em arquivos dedicados;
- arquivos JS especializados por finalidade;
- lógica de checklist isolada e persistente em localStorage;
- componentes reutilizáveis de interface em módulos próprios.

### 3) Acessibilidade e experiência de uso
- foco visível em elementos interativos;
- suporte a `prefers-reduced-motion`;
- navegação por teclado e leitura estruturada;
- imagens com alternativa descritiva;
- uso responsivo para desktop, tablet e mobile.

### 4) Validação básica e manutenção
- revisão de links internos e consistência visual;
- checagem de semântica e layout em páginas estáticas;
- documentação das páginas e objetivo didático por seção.

## Páginas do projeto

### `index.html`
Página inicial do projeto. Apresenta os painéis do 1º e 2º dia do ENEM, contextualiza a proposta pedagógica, inclui introdução ao projeto e a galeria de fotos do evento.

### `primeiro-dia.html`
Painel analítico do 1º dia da prova. Foca em Linguagens, Humanas e Redação, com análise de temas recorrentes, repertórios e estratégias para revisão do exame.

### `segundo-dia.html`
Painel analítico do 2º dia do ENEM. Voltado para Ciências da Natureza, com foco em Biologia, Química e Física, mapa de calor, estudo de caso e revisão estratégica da área.

### `checklist-primeiro-dia.html`
Checklist de revisão do 1º dia, em formato imprimível, com registro de progresso para uso individual ou em sala.

### `checklist.html`
Checklist de revisão do 2º dia, também orientado para impressão e acompanhamento de estudos, com foco em Ciências da Natureza e práticas de revisão do ENEM.

## Como executar localmente

### Opção 1: abrir diretamente no navegador

```bash
git clone https://github.com/Bio-Tech-Edu/enem.git
cd enem
# macOS
open index.html
# Linux
xdg-open index.html
# Windows
start index.html
```

### Opção 2: servidor local

```bash
cd enem
python3 -m http.server 8000
```

Depois, acesse:

```text
http://localhost:8000
```

> Como a aplicação depende de bibliotecas externas via CDN, a conexão com a internet é recomendada na primeira carga.

## Publicação no GitHub Pages

1. Acesse o repositório no GitHub.
2. Vá em `Settings` → `Pages`.
3. Em `Build and deployment`, selecione:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
4. Salve as configurações.

A página ficará disponível em:

```text
https://bio-tech-edu.github.io/enem/
```

## Validação e qualidade

Checklist de qualidade recomendado:

- [x] HTML semântico básico
- [x] Responsividade geral em dispositivos móveis
- [x] Tema claro/escuro funcional
- [x] Foco visível em elementos interativos
- [x] Checklist com persistência em localStorage
- [x] Organização modular de CSS e JS
- [x] Documentação inicial atualizada
- [ ] validação de links e conteúdo final por navegador/QA operacional

## Créditos

Desenvolvido por [Bio+Tech EduDesign](https://github.com/bio-tech-edu).

Apoio institucional:
- Governo do Estado de Mato Grosso
- Secretaria de Estado de Educação (SEDUC-MT)
- Projeto Pré-ENEM Digit@l MT

Professora responsável: Pâmella Araújo Balcaçar

## Licença

Este projeto está licenciado sob a MIT License. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

## Status

Projeto educacional ativo, em processo de refinamento técnico e organização estrutural para facilitar manutenção, evolução e publicação contínua.

---

Feito com propósito pedagógico para fortalecer a aprendizagem e a tomada de decisão em revisão de conteúdos do ENEM.

