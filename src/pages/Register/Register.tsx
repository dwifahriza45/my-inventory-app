import RegisterForm from "../../components/RegisterForm/RegisterForm";
import ThemeToggle from "../../components/ThemeToggle";

function Register() {
    return (
        <section className="flex min-h-screen items-center justify-center bg-gray-100 px-4 dark:bg-gray-900">
            <ThemeToggle />

            <div className="grid w-full max-w-3xl grid-cols-1 gap-8 rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800">
                <RegisterForm />
            </div>
        </section>
    )
}

export default Register