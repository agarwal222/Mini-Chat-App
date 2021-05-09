export const creatRoom = `
<div class="create_room">
<h1>Create A Room</h1>
<section class="form_contaner">
    <label for="room_name">Enter a room name</label>
    <input type="text" name="room_name" id="room_name">
    <label class="private_room_labl" for="private_room">
        <input type="checkbox" name="privare_room" id="private_room" class="private_room_check">
        <spam class="spam_checkbox"></spam>
        Make the room private
    </label>
    <button class="creat_room" id="creat_room">Creat room</button>
    <div class="bysection"><h2>Or</h2></div>
    <button class="join_room" id="join_room">Join a room</button>
</section>
<spam id="err"></spam>
</div>
`;
