//import the User model
const app = require("../../backend/app.js");
const router = require("../../backend/routes/discounts.js");

const assert = require('assert');
const Discount = require("../../backend/models/discount");
const checkAuth = require("../../backend/middleware/check-auth");
const multer = require("multer");

var newDiscountId = '';

describe('Creating discount in mongodb', () => {
  it('returns discount is created', (done) => {
    const discountRecord = new Discount({
      title: 'Audi a7',
      categories: 'automotor',
      expirydate: '17-08-2022',
      content: 'in de aanbieding bij avans hogeschool',
      newprice: '100.000',
      oldprice: '1000',
      shop: 'avans Hogeschool',
      location: 'Breda',
      imagePath: 'adgsf-1673476418656.jpg',
      user: '63c55ede7f2349945fa1b9a1'
    });
    discountRecord.save(discountRecord).then(createdDiscount => {
      newDiscountId = createdDiscount.id;

      assert(createdDiscount.title === "Audi a7");
      assert(createdDiscount.categories === "automotor");
      assert(createdDiscount.newprice === "100.000");
      assert(createdDiscount.oldprice === "1000");
      assert(createdDiscount.location === "Breda");
      done();
    });
  });
});


describe('Reading Details of discount', () => {
  it('returns done if can find discount by id', (done) => {
      Discount.findById("63c077c8f7934729987ca00a").then(discount => {
        console.log(discount);
        if (discount) {
          assert(discount.shop === "tiel");
          done();
        } else {
          res.status(404).json({
            message: "Discount Id niet gevonden"
          })
        }
      })
  })
})
console.log(newDiscountId);


describe('Delete discount', () => {
  it('Delete the discount we added', (done) => {
    Discount.findByIdAndDelete(newDiscountId).then(()=> Discount.findById(newDiscountId).then( result =>
      {
        assert(result === null);
        done();
      }))
    });
});


