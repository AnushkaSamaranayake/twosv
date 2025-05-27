import { useEffect, useState } from "react";
import { TotpMultiFactorGenerator, getMultiFactorResolver, multiFactor } from "firebase/auth";
import { auth } from "../firebase";

const TOTPEnroll = () => {

    const [qrCodeUrl, setQrCodeUrl] = useState("");
    const [verificationCode, setverificationCode] = useState("");
    const [totpEnrollmentId, setTotpEnrollmentId] = useState("");

    useEffect(() => {
        const enrollTotp = async () => {
            const user = auth.currentUser;
            const mfaSession = await multiFactorS(user).getSession();
            
            const totpSecret = await TotpMultiFactorGenerator.generateSecret(mfaSession);
            setTotpEnrollmentId(totpSecret.enrollmentId);
            setQrCodeUrl(totpSecret.qrCodeUrl);
        };
        enrollTotp();
    }, []);

    const handleVerify = async () => {
        try {
            const user  = auth.currentUser;
            const assertion = TotpMultiFactorGenerator.assertionForEnrollment(
                totpEnrollmentId,
                verificationCode
            );

            await multiFactor(user).enroll(assertion, 'My TOTP Authenticator');
            alert("TOTP enrolled successfully!");
        }catch (error) {
            console.error("Error enrolling TOTP:", error);
            alert("Failed to enroll TOTP: " + error.message);
        }
    };

    return (
        <div>
            <h2>Enroll TOTP</h2>
            {qrCodeUrl && <img src={qrCodeUrl} alt="TOTP QR Code" />}
            <p>Scan the QR code in your Authenticator app, then enter the generated code below:</p>
            <input placeholder="Enter code" value={verificationCode} onChange={(e) => setverificationCode(e.target.value)} />
            <button onClick={handleVerify}>Verify</button>
        </div>
    )
}

export default TOTPEnroll
