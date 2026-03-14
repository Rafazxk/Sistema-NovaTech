document.addEventListener('DOMContentLoaded', () => {
    // 1. DADOS INICIAIS
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName') || 'Usuário';
    
    // Proteção de Rota
    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    // Inicialização da UI
    const updateUIStrings = (name) => {
        document.getElementById('nav-user-name').innerText = name;
        document.getElementById('input-name').value = name;
        const avatarUrl = `https://ui-avatars.com/api/?name=${name}&background=38bdf8&color=fff`;
        document.getElementById('user-avatar-main').src = avatarUrl;
        document.getElementById('modal-preview-avatar').src = avatarUrl;
    };
    
    updateUIStrings(userName);

    // 2. NAVEGAÇÃO ENTRE SEÇÕES
    window.showSection = (sectionId) => {
        // Remove ativo de todos
        document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        
        // Ativa o correto
        document.getElementById(sectionId).classList.add('active');
        const activeBtn = Array.from(document.querySelectorAll('.nav-item')).find(btn => 
            btn.getAttribute('onclick').includes(sectionId)
        );
        if(activeBtn) activeBtn.classList.add('active');
        
        // Muda título da página
        const titles = { 'overview': 'Dashboard', 'users': 'Gerenciar Usuários', 'plans': 'Meus Planos' };
        document.getElementById('page-title').innerText = titles[sectionId];
    };

    // 3. MODAL DE PERFIL
    window.openProfileModal = () => {
        document.getElementById('profile-modal').classList.remove('hidden');
    };

    window.closeProfileModal = () => {
        document.getElementById('profile-modal').classList.add('hidden');
    };

    // Preview da imagem
    document.getElementById('avatar-upload').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                document.getElementById('modal-preview-avatar').src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Submit do Perfil
    document.getElementById('profile-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const newName = document.getElementById('input-name').value;
        
        // Simulação de Fetch (Descomente quando o backend estiver pronto)
        /*
        const response = await fetch('http://localhost:3000/api/users/update', {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome: newName })
        });
        */

        localStorage.setItem('userName', newName);
        updateUIStrings(newName);
        alert("Perfil atualizado com sucesso!");
        closeProfileModal();
    });

   const ctx = document.getElementById('mainChart').getContext('2d');



window.upgradePlan = (planName) => {
   
    const displayPlan = document.querySelector('.profile-text small');
    if (displayPlan) displayPlan.innerText = `Plano ${planName}`;
    
    alert(`Parabéns! Você agora é um membro ${planName}.`);
    

    localStorage.setItem('userPlan', planName);
    
    showSection('overview');
};

new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        datasets: [{
            label: 'Interações',
            data: [400, 580, 420, 850, 710, 920, 1100],
            borderColor: '#38bdf8',
            backgroundColor: 'rgba(56, 189, 248, 0.1)',
            borderWidth: 3,
            tension: 0.4,
            fill: true
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false, 
        plugins: {
            legend: { display: false }
        },
        scales: {
            y: { 
                beginAtZero: true,
                grid: { color: 'rgba(255,255,255,0.05)' },
                ticks: { color: '#94a3b8' } 
            },
            x: { 
                grid: { display: false }, 
                ticks: { color: '#94a3b8' } 
            }
        }
    }
});
    const loadUsers = async () => {
        const tbody = document.getElementById('user-list-full');
        try {
            const response = await fetch('http://localhost:3000/api/users', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const users = await response.json();
            
            tbody.innerHTML = users.map(user => `
                <tr>
                    <td>
                        <div style="display:flex; align-items:center; gap:10px">
                            <img src="https://ui-avatars.com/api/?name=${user.nome}&background=random" style="width:30px; border-radius:50%">
                            ${user.nome}
                        </div>
                    </td>
                    <td><span style="color:var(--success)">● Ativo</span></td>
                    <td>
                        <button style="background:none; border:none; color:var(--text-muted); cursor:pointer"><i class="fas fa-edit"></i></button>
                    </td>
                </tr>
            `).join('');
        } catch (err) {
            
            tbody.innerHTML = `
                <tr><td>João Silva</td><td><span style="color:var(--success)">● Ativo</span></td><td><i class="fas fa-edit"></i></td></tr>
                <tr><td>Maria Souza</td><td><span style="color:var(--success)">● Ativo</span></td><td><i class="fas fa-edit"></i></td></tr>
            `;
        }
    };

    loadUsers();

    
    window.logout = () => {
        localStorage.clear();
        window.location.href = 'index.html';
    };
});