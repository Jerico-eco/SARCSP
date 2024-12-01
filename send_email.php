<?php
require 'vendor/autoload.php'; // Include PHPMailer via Composer or manually include the library files
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'] ?? '';

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email address.']);
    exit;
}

// Generate a random 6-digit verification code
$verificationCode = mt_rand(100000, 999999);

// Email configuration
$mail = new PHPMailer(true);

try {
    // SMTP Configuration
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com'; // Use your email service provider's SMTP server
    $mail->SMTPAuth = true;
    $mail->Username = 'your-email@gmail.com'; // Your email
    $mail->Password = 'your-email-password'; // Your email password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Email headers and body
    $mail->setFrom('your-email@gmail.com', 'SARC Portal');
    $mail->addAddress($email); // Recipient email

    $mail->isHTML(true);
    $mail->Subject = 'Your Verification Code';
    $mail->Body = "<p>Your verification code is: <strong>{$verificationCode}</strong></p>";
    $mail->AltBody = "Your verification code is: {$verificationCode}";

    $mail->send();

    echo json_encode([
        'success' => true,
        'message' => 'Verification code sent successfully.',
        'code' => $verificationCode // Return the code for client-side validation
    ]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => "Mailer Error: {$mail->ErrorInfo}"
    ]);
}
