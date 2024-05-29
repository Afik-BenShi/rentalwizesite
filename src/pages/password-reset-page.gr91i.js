import wixLocation from 'wix-location';
import {resetPassword, getUserEmailFromOOB} from 'backend/handler.web';

const emailPromise = getUserEmailFromOOB(wixLocation.query?.oobCode);

$w.onReady(init());
async function init(){
	try{
		const email = await emailPromise;
		$w('#text6').text = email;
		initPasswordCustomValidation();
		resetPasswordHandleInit();
		$w('#multiStateBox1').changeState('full');
	} catch(err) {
		$w('#multiStateBox1').changeState('expired');
	}
}

function initPasswordCustomValidation(){
	$w("#password").onCustomValidation((password, reject) => {
        if (password.length < 8) {
            reject("Password must be at least 8 characters long");
			$w('#button1').disable();
            return;
        } else if (!password.match(/\d/)) {
            reject("Password must have at least 1 digit");
			$w('#button1').disable();
            return;
        } else if (!password.match(/[a-z]/)) {
            reject("Password must have at least 1 lower case letter");
			$w('#button1').disable();
            return;
        } else if (!password.match(/[A-Z]/)) {
            reject("Password must have at least 1 capital letter");
			$w('#button1').disable();
            return;
        }
		$w('#button1').enable();
    });
}
function resetPasswordHandleInit(){
	$w('#button1').onClick(async ()=> {
		if (!$w("#password").valid) return;
		$w('#multiStateBox1').changeState('loading');
		try {
			await resetPassword($w("#password").value, wixLocation.query?.oobCode);
			$w('#multiStateBox1').changeState('success');
		} catch (err) {
			$w('#multiStateBox1').changeState('error');
		}
	})
}