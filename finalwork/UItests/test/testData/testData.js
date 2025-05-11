export default class TestData {
  static fastUser = {
    name: "123", // обязательное поле
    email: "123@123", // обязательное поле
    password: "123", // обязательное поле
    firstName: "123", // обязательное поле
    lastName: "123", // обязательное поле
    address1: "123", // обязательное поле
    state: "123", // обязательное поле
    city: "123", // обязательное поле
    zipcode: "123", // обязательное поле
    mobileNumber: "123", // обязательное поле
  };

  static fullUser = {
    title: "Mr",
    name: "rockuro", // обязательное поле
    email: "tra.dollar.a@gmail.com", // обязательное поле
    password: "qwerty", // обязательное поле
    dayOfBirth: "21",
    monthOfBirth: "January",
    yearOfBirth: "1992",
    newsletterCheckboxData: "yes",
    specialOffersCheckboxData: "yes",
    firstName: "Anton", // обязательное поле
    lastName: "Tratsevskii", // обязательное поле
    company: "OOO Daspadoby",
    address1: "Vostochnaya street", // обязательное поле
    address2: "Logoiskaya street",
    country: "United States", // обязательный пункт, но предустановлен
    state: "Florida", // обязательное поле
    city: "Minsk", // обязательное поле
    zipcode: "220013", // обязательное поле
    mobileNumber: "+375293005020", // обязательное поле
  };

  static feedbackUser = {
    name: "456", // обязательное поле
    email: "456@456", // обязательное поле
    password: "456", // обязательное поле
    firstName: "456", // обязательное поле
    lastName: "456", // обязательное поле
    address1: "456", // обязательное поле
    state: "456", // обязательное поле
    city: "456", // обязательное поле
    zipcode: "456", // обязательное поле
    mobileNumber: "456", // обязательное поле
    subject: "456",
    message: "456",
  };

  static idProduct = [35, 2, 30];

  static category = ["kids", "kids-tops&shirts"];

  static brand = "allen-solly-junior";
  //static brand = 'mast&harbour';

  static quantityToCart = [5, 10];

  static paymentCard = {
    name: "Tony",
    number: "1234 1234 1234 1234",
    CVC: "123",
    expiryMonth: "11",
    expiryYear: "2027",
  };
}
