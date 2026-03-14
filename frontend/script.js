document.addEventListener('DOMContentLoaded', () => {
   
    const modal = document.getElementById('auth-modal');
    const modalTitle = document.getElementById('modal-title');
    const openLogin = document.getElementById('open-login');
    const openSignup = document.getElementById('open-signup');
    const closeModal = document.querySelector('.close-modal');
    const authForm = document.getElementById('auth-form');
    const groupNome = document.getElementById('group-nome');

   
    const toggleModal = (type) => {
        if (type === 'login') {
            modalTitle.innerText = 'Entrar na conta';
            groupNome.style.display = 'none'; 
            authForm.querySelector('input[name="nome"]').required = false;
        } else {
            modalTitle.innerText = 'Criar nova conta';
            groupNome.style.display = 'block'; 
            authForm.querySelector('input[name="nome"]').required = true;
        }
        modal.classList.remove('hidden');
    };

    openLogin.addEventListener('click', () => toggleModal('login'));
    openSignup.addEventListener('click', () => toggleModal('signup'));
    closeModal.addEventListener('click', () => modal.classList.add('hidden'));

    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
    });

   
    authForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(authForm);
        const data = Object.fromEntries(formData.entries());
        const isSignup = modalTitle.innerText === 'Criar nova conta';
        
        const url = isSignup ? 'http://localhost:3000/api/users' : 'http://localhost:3000/api/login';
        
        const payload = isSignup ? {
            nome: data.nome,
            email: data.email,
            senha_hash: data.senha,
            tipo: 'cliente'
        } : {
            email: data.email,
            senha: data.senha
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (response.ok) {
                localStorage.setItem('token', result.token);
                if (result.user && result.user.nome) {
                    localStorage.setItem('userName', result.user.nome);
                }
                
                alert(isSignup ? 'Conta criada com sucesso!' : `Bem-vindo, ${result.user.nome}!`);
                window.location.href = 'dashboard.html'; 
            } else {
                alert(result.error || 'Erro na autenticação');
            }
        } catch (error) {
            console.error('Erro no fetch:', error);
            alert('Erro de conexão com o servidor.');
        }
    });


    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '50px',
        duration: 1000,
        delay: 200,
        reset: false
    });

    sr.reveal('.reveal-top', { origin: 'top' });
    sr.reveal('.reveal-bottom', { interval: 200 });
    sr.reveal('.product-card', { interval: 200 });

   
    window.addEventListener('scroll', () => {
        const header = document.getElementById('navbar');
        if (window.scrollY > 50) {
            header.style.background = "rgba(15, 23, 42, 0.95)";
            header.style.padding = "0.8rem 0";
            header.style.borderBottom = "1px solid #334155";
        } else {
            header.style.background = "transparent";
            header.style.padding = "1.5rem 0";
            header.style.borderBottom = "1px solid transparent";
        }
    });
});