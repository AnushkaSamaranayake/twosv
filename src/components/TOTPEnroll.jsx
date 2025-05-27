import { useEffect, useState } from "react";
import { PhoneMultiFactorGenerator, getMultiFactorSession, multiFactor } from "firebase/auth";
import { auth } from "../firebase";

const TOTPEnroll = () => {

    const [qrCodeUrl, setQrCodeUrl] = useState("");
    const [code, setCode] = useState("");

    useEffect(() => {
        const enroll = async () => {
            const user = auth.currentUser;
            const mfaSession = await getMultiFactorSession(user);
            const totpFactor = new multiFactor(user).getSession().enrollments.find(e => e.factorId === "totp");
            if (!totpFactor) {
                const { totpEnrollment } = await multiFactor(user).enroll(
                    PhoneMultiFactorGenerator.assertion({ code }),
                    "My TOTP Auth"
                );
                setQrCodeUrl(totpEnrollment.qrCodeUrl);
            }
        };
        enroll();
    }, []);

    const handleVerify = async () => {
        try {
            const user  = auth.currentUser;
            await multiFactor(user).enroll(
                PhoneMultiFactorGenerator.assertion({ code }),
                "My TOTP Auth"
            );
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
            <input placeholder="Enter code" value={code} onChange={(e) => setCode(e.target.value)} />
            <button onClick={handleVerify}>Verify</button>
        </div>
    )
}

export default TOTPEnroll
