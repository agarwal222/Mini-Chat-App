export const LoginPage = `
<div class="login_pannel">
    <h1>Log In</h1>
    <section class="form_contaner">
        <label for="email" class="email">E-Mail</label><span class="material-icons" id="email_info_card">info</span><br />
        <input type="email" name="email" class="email_input" id="email"><br />
        <label for="display_name" class="display_name">Display Name</label><span class="material-icons" id="name_info_card">info</span><br />
        <input type="text" name="display_name" class="siaplay_name_input" id="display_name"><br />
        <button type="submit" id="btn" class="login_btn">Next</button>
    </section>
    <spam id="err"></spam>
</div>
`;
