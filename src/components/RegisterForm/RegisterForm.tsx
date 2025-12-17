import Input from '../Input'
import Button from '../Button'
import { Link } from 'react-router-dom'


const RegisterForm = () => (
    <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Register</h2>
        <Input label="Full Name" placeholder="Your name" />
        <Input label="Email" placeholder="you@example.com" />
        <Input label="Password" type="password" placeholder="••••••••" />
        <Button text="Create Account" />
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account? <span className="cursor-pointer text-indigo-600"><Link to="/">Login</Link></span>
        </p>
    </div>
)


export default RegisterForm