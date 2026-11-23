# Saint Barbearia — site

Site institucional de página única da **Saint Barbearia** (Santa Quitéria, Curitiba).
Feito em HTML, CSS e JavaScript puros — sem build, sem dependências, sem mensalidade.

## O que tem

- **Hero** com foto de fundo, nota do Google (4,7 · 224 avaliações) e status "aberto/fechado" calculado na hora.
- **Tabela de serviços** com preços e um link de WhatsApp por serviço (já vem com a mensagem escrita).
- **Galeria** com lightbox.
- **Sobre** com os valores da casa (inclui o acolhimento à comunidade LGBTQ+).
- **Avaliações reais** do Google.
- **Contato** com endereço, horário, mapa embutido e botões de WhatsApp / rota.
- **Botão flutuante** de WhatsApp em todas as telas.
- Layout responsivo, acessível (foco visível, `prefers-reduced-motion`) e otimizado para SEO/Open Graph.

## Estrutura

```
index.html              → página inteira
assets/css/styles.css   → estilos
assets/js/main.js       → links de WhatsApp, status de aberto, menu, galeria
assets/img/             → fotos e favicon
```

## Como editar

### WhatsApp
Em `assets/js/main.js`, no topo:

```js
const CONFIG = { whatsapp: "5541999937656", ... };
```

Formato: `55` + DDD + número, só dígitos, sem espaços nem símbolos.

### Preços e serviços
Direto no `index.html`, na seção `id="servicos"`. Cada serviço é um
`<article class="price-card">`; o preço fica em `<span class="price">` e a
mensagem que abre no WhatsApp em `data-wa="..."` no link de agendamento.
Se mudar o preço, mude também o texto de `data-wa` para o cliente não pedir
o valor antigo.

### Horários
Dois lugares, para não ficarem diferentes:

1. `assets/js/main.js` → objeto `CONFIG.hours` (usado pelo selo "Aberto agora").
2. `index.html` → lista `#hoursList` e o JSON-LD no `<head>`.

### Fotos
Substitua os arquivos em `assets/img/` mantendo os mesmos nomes
(`corte-maquina.jpg`, `interior.jpg`, etc.) — ou troque os caminhos no HTML.
As fotos atuais são de banco de imagens (Unsplash, uso livre); o ideal é trocar
pelas fotos reais do Leandro e do Bruno assim que tiverem.

### Placa / logo (bloco "A casa")
A foto antiga da fachada tinha só 233×151 px e ficava borrada ampliada, então a
placa foi **recriada em HTML/CSS** (madeira, letras claras e o A vermelho).
Ela é nítida em qualquer tela e não depende de imagem.

Para editar, procure por `<figure class="sign">` no `index.html`:

- as letras `S A I N T` estão em `.sign-word` (o A vermelho é o `<span class="sign-a">`);
- `Barberia` está em `.sign-sub`;
- as cores e o efeito metálico ficam em `.sign-word`, `.sign-a` e `.sign-sub`
  no `styles.css`.

Se um dia tiverem uma foto da fachada em alta resolução, dá para trocar a placa
pela foto de verdade — é só substituir o `<figure class="sign">` por um `<img>`.

## Rodar localmente

Basta abrir `index.html` no navegador, ou servir a pasta:

```bash
python -m http.server 8000
# http://localhost:8000
```

## Publicar no GitHub Pages

```bash
git init
git add .
git commit -m "Site da Saint Barbearia"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/saint-barbearia.git
git push -u origin main
```

Depois, no repositório: **Settings → Pages → Source: Deploy from a branch →
Branch: `main` / folder `/ (root)`**. Em um ou dois minutos o site fica em
`https://SEU-USUARIO.github.io/saint-barbearia/`.

> Se for usar domínio próprio (ex.: `saintbarbearia.com.br`), crie um arquivo
> `CNAME` na raiz com o domínio e ajuste a tag `canonical` no `<head>`.

## Pendências antes de entregar

- [ ] Confirmar **horários reais** de funcionamento com os donos.
- [ ] Confirmar os **preços** da tabela (estão como referência de mercado em Curitiba).
- [ ] Trocar as fotos de banco de imagens pelas fotos e vídeos reais da barbearia.
- [ ] Se conseguirem uma foto da fachada em alta resolução, trocar a placa recriada pela foto real.
- [ ] Confirmar se aceitam cartão / quais bandeiras.
- [ ] Trocar as fotos por versões otimizadas em WebP, se quiser carregar ainda mais rápido.
