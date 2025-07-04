import sendOrderEmail from './mail.js';



const paymentSuccess = async (req, res) => {
  try {
    const { userEmail, orderId } = req.body;
    await sendOrderEmail(userEmail, orderId);

    res.status(200).json({ message: "Payment done, email sent!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default paymentSuccess;
