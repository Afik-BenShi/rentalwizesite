import {askToBeRemoved} from 'backend/handler.web';

$w.onReady(function () {
	$w('#button1').onClick(async ()=> {
		const email = $w("#email").value;
		const password = $w("#password").value;
		if (!email || !password){
			$w("#message").text = "Please insert email and password to your account";
			$w('#message').expand();
			return;
		}
		const isAdded = askToBeRemoved(email, password);
		$w("#message").text = isAdded? "Removal request accepted" : "Your email and password do not match or we have a problem on our side";
		$w('#message').expand();
	})
});