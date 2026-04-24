import "./Register.css";  // 👈 ADD THIS

export default function Register() {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Register</h2>

        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />

        <button>Register</button>
      </div>
    </div>
  );
}