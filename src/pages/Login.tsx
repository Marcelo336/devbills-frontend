import { useEffect } from "react";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { useAuth } from "../context/useAuth"; 
import { useNavigate } from "react-router";

const Login = () => {
 
  const { authState, signInWithGoogle, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
      
    } catch (err) {
      console.error("Erro ao fazer login com o Google localmente:", err);
    }
  };

  useEffect(() => {
    
    if (authState && !loading) {
      navigate("/dashboard");
    }
   
  }, [authState, loading, navigate]);
  
  if (loading) {
    return <div>Carregando...</div>;
  }

  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <p className="bg-red-50 text-center text-red-700 mt-4 p-4 rounded">
            Erro: {error}
          </p>
          {/* Opcional: botão para tentar novamente ou recarregar */}
          <button
            onClick={() => window.location.reload()}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-md w-full space-y-8">
        <header>
          <h1 className="text-center text-3xl font-extrabold text-gray-900 ">DevBills</h1>
          <p className="mt-2 text-center text-sm text-gray-600">Gerencie suas finanças de forma simples e eficiente</p>
        </header>

        <main className="mt-8 bg-white py-8 px-4 shadow-md rounded-lg sm:px-10 space-y-6">
          <section className="mb-6">
            <h2 className="text-lg font-medium text-gray-900 text-center">Faça login para continuar</h2>
            <p className="mt-1 text-sm text-gray-600 text-center">Acesse sua conta para começar a gerenciar suas finanças</p>
          </section>

          
          <GoogleLoginButton onClick={handleLogin} isLoading={loading} />

          
          {error && ( 
            <div className="bg-red-50 text-center text-red-700 mt-4 p-4 rounded">
              <p>{error}</p> 
            </div>
          )}

          <footer className="mt-6">
            <p className="mt-1 text-sm text-gray-600 text-center">
              Ao fazer login, você concorda com nossos termos de uso e
              política de privacidade.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Login;