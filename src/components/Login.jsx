import { useForm } from 'react-hook-form';
import { Card, Message, Button, Input, Label } from "../assets/ui";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signin, isAuthenticated, errors: signinErrors } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await signin(data);
    } catch (err) {
      console.error("Error en login:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Solo redirige si está autenticado y no hay errores
    if (isAuthenticated && signinErrors.length === 0) {
      navigate("/");
    }
  }, [isAuthenticated, signinErrors]);

  return (
    <div className="h-[calc(100vh-100px)] flex items-center bg-zinc-900 justify-center">
      <Card>
        {/* Mostrar errores de login */}
        {signinErrors.length > 0 && (
          <div className="mb-4">
            {signinErrors.map((error, i) => (
              <Message message={error} key={i} />
            ))}
          </div>
        )}

        <h1 className="text-2xl font-bold text-sky-500">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            name="email"
            placeholder="youremail@domain.tld"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format"
              }
            })}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby="email-error"
          />
          <p id="email-error" className="text-red-500">{errors.email?.message}</p>

          <Label htmlFor="password">Password:</Label>
          <Input
            type="password"
            name="password"
            placeholder="Write your password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" }
            })}
            aria-invalid={errors.password ? "true" : "false"}
            aria-describedby="password-error"
          />
          <p id="password-error" className="text-red-500">{errors.password?.message}</p>

          <Button disabled={loading}>
            {loading ? "Entrando..." : "Login"}
          </Button>
        </form>

        <p className="flex gap-x-2 justify-between mt-4">
          Don't have an account? <Link to="/register" className="text-sky-500">Sign up</Link>
        </p>
      </Card>
    </div>
  );
}

export default Login;
