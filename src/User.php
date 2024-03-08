<?php
namespace Acme;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
class User {
private $conn;

public function __construct() {
$this->conn = Database::getConnection();
}

public function register($username, $email, $password) {
// Check if the email already exists
$stmt = $this->conn->prepare("SELECT COUNT(*) FROM cpt_users WHERE email = ?");
$stmt->bindParam(1, $email);
$stmt->execute();

if ($stmt->fetchColumn() > 0) {
return "Email already exists.";
}

// Hash the password
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Insert the new user
$stmt = $this->conn->prepare("INSERT INTO cpt_users (user_name, email, password_hash, verification_token, verification_token_expiry) VALUES (?, ?, ?, ?, ?)");

// Generate a verification token
$verificationToken = bin2hex(random_bytes(16));
$expiry = date('Y-m-d H:i:s', time() + (24 * 60 * 60)); // 24 hours from now

$stmt->bindParam(1, $username);
$stmt->bindParam(2, $email);
$stmt->bindParam(3, $hashed_password);
$stmt->bindParam(4, $verificationToken);
$stmt->bindParam(5, $expiry);

if ($stmt->execute()) {
// Send the email
$mail = new PHPMailer(true);
// Set PHPMailer to use SMTP, set SMTP host, authentication, etc.
$mail->setFrom('your@example.com', 'Mailer');
$mail->addAddress($email, $username);
$mail->isHTML(true);
$mail->Subject = 'Email Confirmation';
$mail->Body    = 'Please click on this link to confirm your email: <a href="http://yourwebsite.com/confirm.php?token=' . $verificationToken . '">Confirm Email</a>';
$mail->send();

return "User registered successfully, please check your email for confirmation.";
} else {
return "Error: " . $stmt->errorInfo()[2];
}
}

public function login($email, $password) {
// Verify user and password
}

// Additional user-related methods can be added here
}