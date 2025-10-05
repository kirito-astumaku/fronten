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

  const Onsubmit = async (data) => {
    setLoading(true);
    await signin(data);
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  return (
    <div className="h-[calc(100vh-100px)] flex items-center bg-zinc-900 justify-center">
      <Card>
        {signinErrors.map((error, i) => (
          <Message message={error} key={i} />
        ))}

        <h1 className="text-2xl font-bold text-sky-500">Login</h1>

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <span className="text-sky-500 animate-pulse text-lg">Cargando...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit(Onsubmit)}>
            <Label htmlFor="email">Email:</Label>
            <Input
              type="email"
              name="email"
              placeholder="youremail@domain.tld"
              {...register("email", { required: "Email is required" })}
            />
            <p className="text-red-500">{errors.email?.message}</p>

            <Label htmlFor="password">Password:</Label>
            <Input
              type="password"
              name="password"
              placeholder="Write your password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" }
              })}
            />
            <p className="text-red-500">{errors.password?.message}</p>

            <Button disabled={loading}>
              {loading ? "Entrando..." : "Login"}
            </Button>
          </form>
        )}

        <p className="flex gap-x-2 justify-between">
          Don't have an account? <Link to="/register" className="text-sky-500">Sign up</Link>
        </p>
      </Card>
    </div>
  );
}

export default Login;
