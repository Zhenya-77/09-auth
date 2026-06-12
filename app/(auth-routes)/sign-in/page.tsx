"use client";
import { login, LoginRequest } from "@/lib/api/clientApi";
import css from "./SignInPage.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/store/authStore";

function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const setUser = useAuth((state) => state.setUser);

  const hanldeLogin = async (formData: FormData) => {
    try {
      const payload: LoginRequest = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      };
      const res = await login(payload);
      if (res) {
        setUser(res);
        router.push("/profile");
      } else {
        setError("Invalid email or password");
      }
    } catch {
      setError("Oooops... some error");
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} action={hanldeLogin}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        <p className={css.error}>{error}</p>
      </form>
    </main>
  );
}

export default Login;
