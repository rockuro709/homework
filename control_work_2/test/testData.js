export default class TestData {
  static fastUser = {
    name: "123", // обязательное поле
    email: "123@123", // обязательное поле
    password: "123", // обязательное поле
    firstName: "123", // обязательное поле
    lastName: "123", // обязательное поле
    address: "123", // обязательное поле
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
    address: "Vostochnaya street", // обязательное поле
    address2: "Logoiskaya street",
    country: "United States", // обязательный пункт, но предустановлен
    state: "Florida", // обязательное поле
    city: "Minsk", // обязательное поле
    zipcode: "220013", // обязательное поле
    mobileNumber: "+375293005020", // обязательное поле
  };

  static feedbackUser = {
    name: "feedback", // обязательное поле
    email: "feedback@feedback", // обязательное поле
    password: "feedback", // обязательное поле
    firstName: "feedback", // обязательное поле
    lastName: "feedback", // обязательное поле
    address: "feedback", // обязательное поле
    state: "feedback", // обязательное поле
    city: "feedback", // обязательное поле
    zipcode: "feedback", // обязательное поле
    mobileNumber: "feedback", // обязательное поле
    subject: "feedback",
    message: "feedback",
  };

  static idProduct = [1, 2];

  static category = ["kids", "kids-tops&shirts"];

  static brand = "allen-solly-junior";
  //static brand = 'mast&harbour';
}
