import { Html, Font, Head, Preview, Section, Row, Text, Heading } from "@react-email/components";

export function VerificationEmail({ otp, username }) {

    return (
        <Html lang="en">
            <Head>
                <Font
                    fontFamily="Roboto"
                    fallbackFontFamily="Verdana"
                    webFont={{
                        url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
                        format: "woff2",
                    }}
                    fontWeight={400}
                    fontStyle="normal"
                />
                <title>Verification Code</title>
            </Head>
            <Preview>Your Verification Code is {otp}</Preview>
            <Section>
                <Row>
                    <Heading as="h2">Hello {username}</Heading>
                </Row>
                <Row>
                    <Text>{otp}</Text>
                </Row>
                <Row>
                    <Text>
                        Thank you for registering. We're excited to have you with us. Please use the above verification code to complete your registration.
                    </Text>
                    <Text>
                        If you have any questions or need assistance, feel free to reach out.
                    </Text>
                </Row>
            </Section>
        </Html>
    );
}


