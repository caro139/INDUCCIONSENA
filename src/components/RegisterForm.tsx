import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase';

export const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { signUp, signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const emailFormatted = `${email}@aprendiz.sena.edu.co`;
      if (isRegistering) {
        await signUp(auth, emailFormatted, password);
      } else {
        await signIn(auth, emailFormatted, password);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">
        {isRegistering ? 'Registro Aprendiz' : 'Ingreso Aprendiz'}
      </h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Documento de identidad"
          className="w-full p-2 border rounded dark:bg-slate-700 dark:text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full p-2 border rounded dark:bg-slate-700 dark:text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-[#00324D] text-white p-2 rounded">
          {isRegistering ? 'Registrarse' : 'Ingresar'}
        </button>
      </form>
      <button 
        onClick={() => setIsRegistering(!isRegistering)}
        className="mt-4 text-sm text-sky-600 dark:text-sky-400"
      >
        {isRegistering ? '¿Ya tienes cuenta? Ingresa aquí' : '¿No tienes cuenta? Regístrate aquí'}
      </button>
    </div>
  );
};
