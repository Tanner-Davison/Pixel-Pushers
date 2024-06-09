export const passwordStrength=(e, password, setPasswordFill, setIsStrong, setPassword)=>{
    const currentPassword = e.target.value;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (e.target.value && password.length > 4) {
      setIsStrong(regex.test(currentPassword));
    }
    if (!e.target.value) {
      setPasswordFill("black");
      setIsStrong(null);
    }

    setPasswordFill(
      regex.test(currentPassword)
        ? "hsla(135, 50%, 50%, 1)"
        : "hsla(350, 50%, 60%, 1)"
    );
    return setPassword(e.target.value);
}