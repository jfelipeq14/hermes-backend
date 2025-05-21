export const ERESET_PASSWORD = {
  subject: 'Activate your account',
  html: () => `

<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Restablecer Contraseña</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f8f9fa;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        .reset-container {
            background: #ffffff;
            padding: 2.5rem;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            width: 100%;
            max-width: 450px;
        }
        .logo {
            text-align: center;
            margin-bottom: 1.5rem;
        }
        h1 {
            color: #2c3e50;
            text-align: center;
            margin-bottom: 1.5rem;
            font-size: 1.8rem;
        }
        .form-group {
            margin-bottom: 1.5rem;
        }
        label {
            display: block;
            margin-bottom: 0.5rem;
            color: #495057;
            font-weight: 500;
        }
        input {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #ced4da;
            border-radius: 5px;
            font-size: 1rem;
            transition: border-color 0.3s;
        }
        input:focus {
            outline: none;
            border-color: #80bdff;
            box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        }
        .btn {
            width: 100%;
            padding: 0.75rem;
            background-color: #3498db;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        .btn:hover {
            background-color: #2980b9;
        }
        .footer-text {
            text-align: center;
            margin-top: 1.5rem;
            color: #6c757d;
            font-size: 0.9rem;
        }
        .error-message {
            color: #e74c3c;
            font-size: 0.9rem;
            margin-top: 0.5rem;
            display: none;
        }
    </style>
</head>
<body>
    <div class="reset-container">
        <div class="logo">
            <!-- Puedes colocar aquí tu logo -->
            <h2>Mi Aplicación</h2>
        </div>
        
        <h1>Restablecer Contraseña</h1>
        
        <form id="resetForm" action="/auth/reset-password" method="POST">
            <input type="hidden" name="token" value="<!-- Token de restablecimiento -->">
            
            <div class="form-group">
                <label for="newPassword">Nueva Contraseña</label>
                <input type="password" id="newPassword" name="newPassword" required 
                       minlength="8" placeholder="Mínimo 8 caracteres">
                <div id="passwordError" class="error-message"></div>
            </div>
            
            <div class="form-group">
                <label for="confirmPassword">Confirmar Contraseña</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required 
                       placeholder="Repite tu nueva contraseña">
                <div id="confirmError" class="error-message"></div>
            </div>
            
            <button type="submit" class="btn">Restablecer Contraseña</button>
        </form>
        
        <p class="footer-text">
            ¿No solicitaste un restablecimiento? <a href="/auth/login">Inicia sesión</a>
        </p>
    </div>

    <script>
        document.getElementById('resetForm').addEventListener('submit', function(e) {
            const password = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const passwordError = document.getElementById('passwordError');
            const confirmError = document.getElementById('confirmError');
            
            // Reset errors
            passwordError.style.display = 'none';
            confirmError.style.display = 'none';
            
            // Validaciones
            if (password.length < 8) {
                passwordError.textContent = 'La contraseña debe tener al menos 8 caracteres';
                passwordError.style.display = 'block';
                e.preventDefault();
                return;
            }
            
            if (password !== confirmPassword) {
                confirmError.textContent = 'Las contraseñas no coinciden';
                confirmError.style.display = 'block';
                e.preventDefault();
                return;
            }
            
            // Si todo está bien, el formulario se enviará
        });
    </script>
</body>
</html>

    `,
};
