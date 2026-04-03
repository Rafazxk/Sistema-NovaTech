# NovaTech Pro 

O **NovaTech Pro** é um ecossistema de gestão e automação desenvolvido para operar como o núcleo de operações de uma startup. Focado em escalabilidade e performance, o sistema utiliza uma arquitetura modular em Node.js para garantir processos fluidos e seguros.

---

## Arquitetura e Diferenciais Técnicos

Este projeto não é apenas um script, mas um sistema estruturado para suportar o crescimento de um negócio.

- **Clean Code:** Organização de pastas seguindo padrões de responsabilidade única.
- **Gerenciamento de Processos:** Utilização do **PM2** para garantir que o sistema permaneça online 24/7, com reinicialização automática em caso de falhas.
- **Modularidade:** Estrutura preparada para integração facilitada com bancos de dados relacionais (PostgreSQL) e APIs externas.
- **Desenvolvimento Híbrido:** Ambiente otimizado para rodar tanto em servidores tradicionais quanto em ambientes mobile via **Termux**.

---

## Stack Tecnológica

- **Runtime:** Node.js (v24+)
- **Linguagem:** JavaScript (ES6+)
- **Process Manager:** PM2 (Monitoramento e Resiliência)
- **Versionamento:** Git & GitHub

---

## Estrutura do Projeto

O sistema está organizado para facilitar a manutenção e o entendimento do fluxo de dados:

```bash
NovaTech/
 ├── database/     # Scripts de migração e conexão com DB
 ├── logs/         # Registros de atividades do sistema
 ├── scripts/      # Automações de inicialização e backup
 ├── src/          # Código fonte principal (Core)
 └── package.json  # Gerenciamento de dependências e scripts
```
---
## Instalação e Execução

 Pré Requisitos
 - Node.js instalado.
 - PM2 (opcional, para ambiente em produção).

 Passo a Passo

1. Clone o repositório:
```bash 
  git clone [https://github.com/Rafazxk/Sistema-NovaTech.git](https://github.com/Rafazxk/Sistema-NovaTech.git)
```
2. Acesse o diretório: 
```bash 
 cd Sistema-NovaTech
```
3. Instale as dependências:
```bash
 npm install
```
4.Inicie o sistema:
 - Modo Desenvolvimento:
    ```bash
      npm start  
    ``` 
 - Modo Produção (via PM2):
    ```bash
      pm2 start index.js --name "novatech-pro"
    ```
 ## Próximos passos
 
 - [ ] Implementação de Dashboard Administrativo em React.
- [ ] Integração total com PostgreSQL para persistência de dados.
- [ ] Implementação de camadas de segurança com JWT.

---

Desenvolvido por Rafael Silva - Estudante de ADS no 5º período.
