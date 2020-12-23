import { Component, OnDestroy, OnInit} from '@angular/core';
import {CartObjectService} from '../../services/components-data/cart-object.service';
import {CartItems} from '../../models/order/CartItems';
import {ActivatedRoute} from '@angular/router';
import {Drops} from '../../models/drops/Drops';
import {Lens} from '../../models/lense/Lens';
import {TokenStorageService} from '../../services/token-storage.service';
import {CabinetService} from '../../services/cabinet.service';
import {LensService} from '../../services/lens.service';
import {Items, OrderToSend} from '../../models/order/OrderToSend';
import {lensAxis, lensBCValues, lensCylinder, lenseDiopters, lenseQuantity} from '../../constants/lense/lenses';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SpecialOffer} from '../../models/special-offers/SpecialOffer';
import {Solution} from '../../models/solution/Solution';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  orderStep = 1;
  cartItems: CartItems[]; cartLensesValidation; cartListErrors: string[] = []; cartErrorMsg = false;
  totalPrice = 0; priceToPayAfterDelivery = 0; priceToPayNow = 0;
  cartItemsQuantity = 0;
  authUserData;
  itemsToSend: Items[] = [{
    offers: [],
    drops: [],
    lenses: []
  }];
  lenseQuantity; lenseDiopters; lensBC; lensCylinder; lensAxis;
  userDataForm: FormGroup;
  deliveryForm: FormGroup;


  constructor(private cartObjectService: CartObjectService,
              private activatedRoute: ActivatedRoute,
              private token: TokenStorageService,
              private cabinetService: CabinetService,
              private lensService: LensService) {
    this.userDataForm = new FormGroup({
      userFirstName: new FormControl('', [Validators.required]),
      userLastName: new FormControl('', [Validators.required]),
      userPhone: new FormControl('', [Validators.required]),
      userCity: new FormControl('', [Validators.required]),
      userWarehouseNumber: new FormControl('', [Validators.required]),
      aboutWarehouse: new FormControl(''),
      customerComment: new FormControl('')
    });
    this.deliveryForm = new FormGroup({
      novaPoshta: new FormControl(false),
      ukrPoshta: new FormControl(false),
      inPost: new FormControl(false),
      byCardPay: new FormControl(false)
    });
    this.cartObjectService.getObject().subscribe(value => {
      if (value){
        this.cartItems = value;
        this.cartItems.map(item => {
          this.cartItemsQuantity = 0;
          this.totalPrice = 0;
          item.drops.map(valuePrice => {
            this.totalPrice += valuePrice.price * valuePrice.quantity;
            this.cartItemsQuantity += valuePrice.quantity;
          });
          item.solutions.map(valuePrice => {
            this.totalPrice += valuePrice.price * valuePrice.quantity;
            this.cartItemsQuantity += valuePrice.quantity;
          });
          item.lenses.map(valuePrice => {
            this.totalPrice += valuePrice.price * valuePrice.quantity;
            this.cartItemsQuantity += valuePrice.quantity;
          });
          item.offers.map(valuePrice => {
            this.totalPrice += valuePrice.price;
            this.cartItemsQuantity += valuePrice.quantity;
          });
        });
      }
    });
    this.lenseQuantity = lenseQuantity; this.lenseDiopters = lenseDiopters; this.lensBC = lensBCValues;
    this.lensAxis = lensAxis; this.lensCylinder = lensCylinder;
  }

  ngOnInit(): void {
    console.log(this.cartItems);

    this.cabinetService.getUserByUsername().subscribe(value => {
      this.authUserData = value;
      console.log(this.authUserData);
    });

  }

  ngOnDestroy(): void {
  }

  nextStep(cartItems: CartItems[]): void {
    this.cartLensesValidation = false;
    this.cartListErrors.push('Заповніть усі параметри');
    const boolArrayOfDiopters = [];
    const boolArrayOfDioptersOffer = [];
    const boolArrayOfCylinders = [];
    const boolArrayOfCylindersOffer = [];
    const boolArrayOfAxis = [];
    const boolArrayOfAxisOffer = [];
    const boolArrayOfBC = [];
    const boolArrayOfBCOffer = [];

    cartItems[0].lenses.map((value, index) => {
      if (value.diopters === 'Вибрати'){
        boolArrayOfDiopters.push(true);
      } else{
        boolArrayOfDiopters.push(false);
      }
      if (value.hasCylinder && !value.cylinder || value.cylinder === 'Вибрати'){
        boolArrayOfCylinders.push(true);
      }else {
        boolArrayOfCylinders.push(false);
      }
      if (value.hasAxis && !value.axis || value.axis === 'Вибрати'){
        boolArrayOfAxis.push(true);
      }else {
        boolArrayOfAxis.push(false);
      }
      if (!value.hasDefaultBC && Number(value.defaultBC) === 0 || value.defaultBC === 'Вибрати'){
        boolArrayOfBC.push(true);
      }else {
        boolArrayOfBC.push(false);
      }
      console.log(boolArrayOfBC);

      if (!value.diopters || boolArrayOfDiopters.includes(true) ||
          boolArrayOfCylinders.includes(true) || boolArrayOfAxis.includes(true) ||
          boolArrayOfBC.includes(true)) {
        this.cartLensesValidation = false;
        this.cartErrorMsg = true;
        setTimeout(() => {
          this.cartErrorMsg = false;
          this.cartListErrors.splice(-1, 1);
        }, 5000);
      }else {
        this.cartLensesValidation = true;
      }
    });

    cartItems[0].offers.map((value, index) => {
      if (value.diopters === 'Вибрати'){
        boolArrayOfDioptersOffer.push(true);
      } else{
        boolArrayOfDioptersOffer.push(false);
      }
      if (value.hasCylinder && !value.cylinder || value.cylinder === 'Вибрати'){
        boolArrayOfCylindersOffer.push(true);
      }else {
        boolArrayOfCylindersOffer.push(false);
      }
      if (value.hasAxis && !value.axis || value.axis === 'Вибрати'){
        boolArrayOfAxisOffer.push(true);
      }else {
        boolArrayOfAxisOffer.push(false);
      }
      if (!value.hasDefaultBC && Number(value.defaultBC) === 0 || value.defaultBC === 'Вибрати'){
        boolArrayOfBCOffer.push(true);
      }else {
        boolArrayOfBCOffer.push(false);
      }

      if (!value.diopters || boolArrayOfDioptersOffer.includes(true) ||
        boolArrayOfCylindersOffer.includes(true) || boolArrayOfAxisOffer.includes(true) ||
        boolArrayOfBCOffer.includes(true)) {
        this.cartLensesValidation = false;
        this.cartErrorMsg = true;
        setTimeout(() => {
          this.cartErrorMsg = false;
          this.cartListErrors.splice(-1, 1);
        }, 5000);
      }else {
        this.cartLensesValidation = true;
      }
    });

    if (!this.cartLensesValidation){
      return;
    }

    if (this.orderStep === 1){
      if (this.deliveryForm.controls.novaPoshta.value === true){
        this.deliveryForm.get('ukrPoshta').setValue(false);
      }else if (this.deliveryForm.controls.ukrPoshta.value === true){
        this.deliveryForm.get('novaPoshta').setValue(false);
      }
      if (this.deliveryForm.controls.novaPoshta.value === false && this.deliveryForm.controls.ukrPoshta.value === false ||
          this.deliveryForm.controls.inPost.value === false && this.deliveryForm.controls.byCardPay.value === false){
        return;
      }else {
        this.orderStep += 1;
      }
    }

    if (this.orderStep === 2) {
      return;
    }
    this.orderStep += 1;
  }

  prevStep(): void {
    if (this.orderStep === 0) {
      return;
    }
    this.orderStep -= 1;
  }

  deleteCareFromList(care: Drops): void {
    this.cartItems.map(value => {
      const dropInArr = value.drops.find(drop => drop.name === care.name);
      this.totalPrice -= dropInArr.price;
      const index = value.drops.indexOf(dropInArr);
      if (index > -1) {
        value.drops.splice(index, 1);
      }
    });
    this.cartObjectService.sendObject(this.cartItems);
  }
  deleteLenseFromList(lense: Lens): void {
    this.cartItems.map(value => {
      const lensInArr = value.lenses.find(lens => lens.name === lense.name);
      this.totalPrice -= lensInArr.price;
      const index = value.lenses.indexOf(lensInArr);
      if (index > -1) {
        value.lenses.splice(index, 1);
      }
    });
    this.cartObjectService.sendObject(this.cartItems);
  }
  deleteOfferFromList(offer: SpecialOffer): void {
    this.cartItems.map(value => {
      const offerInArr = value.offers.find(offerValue => offerValue.name === offer.name);
      this.totalPrice -= offerInArr.price;
      const index = value.offers.indexOf(offerInArr);
      if (index > -1) {
        value.offers.splice(index, 1);
      }
    });
    this.cartObjectService.sendObject(this.cartItems);
  }
  deleteSolutionFromList(solution: Solution): void {
    this.cartItems.map(value => {
      const solutionInArr = value.solutions.find(solutionValue => solutionValue.name === solution.name);
      this.totalPrice -= solutionInArr.price;
      const index = value.solutions.indexOf(solutionInArr);
      if (index > -1) {
        value.solutions.splice(index, 1);
      }
    });
    this.cartObjectService.sendObject(this.cartItems);
  }
  changeDropsQuantity(item: CartItems, event, careId): void {
    item.drops.map(value => {
      if (careId === value.id){
        value.quantity = Number(event.target.value);
      }
    });
    this.cartObjectService.sendObject(this.cartItems);
  }
  changeLensesQuantity(item: CartItems, event, lensId): void {
    item.lenses.map((value) => {
      if (lensId === value.id){
        value.quantity = Number(event.target.value);
      }
    });
    console.log(item);
    this.cartObjectService.sendObject(this.cartItems);
  }
  changeLensBc(item: CartItems, event, lensId): void {
    item.lenses.map((value) => {
      if (lensId === value.id){
        value.defaultBC = event.target.value;
      }
    });
    console.log(item);
    this.cartObjectService.sendObject(this.cartItems);
  }
  changeDiopters(item: CartItems, event, lensId): void {
    item.lenses.map(value => {
      if (lensId === value.id){
       value.diopters = event.target.value;
      }
    });
    console.log(this.cartItems);
    this.cartObjectService.sendObject(this.cartItems);
  }
  changeLensCylinder(item: CartItems, event, lensId): void {
    item.lenses.map((value) => {
      if (lensId === value.id){
        value.cylinder = event.target.value;
      }
    });
    console.log(item);
    this.cartObjectService.sendObject(this.cartItems);
  }
  changeLensAxis(item: CartItems, event, lensId): void {
    item.lenses.map((value) => {
      if (lensId === value.id){
        value.axis = event.target.value;
      }
    });
    console.log(item);
    this.cartObjectService.sendObject(this.cartItems);
  }
  changeOfferBc(item: CartItems, event, offerId): void {
    item.offers.map((value) => {
      if (offerId === value.id){
        value.defaultBC = event.target.value;
      }
    });
    console.log(item);
    this.cartObjectService.sendObject(this.cartItems);
  }
  changeOfferDiopters(item: CartItems, event, offerId): void {
    item.offers.map(value => {
      if (offerId === value.id){
        value.diopters = event.target.value;
      }
    });
    console.log(this.cartItems);
    this.cartObjectService.sendObject(this.cartItems);
  }
  changeOfferCylinder(item: CartItems, event, offerId): void {
    item.offers.map((value) => {
      if (offerId === value.id){
        value.cylinder = event.target.value;
      }
    });
    console.log(item);
    this.cartObjectService.sendObject(this.cartItems);
  }
  changeOfferAxis(item: CartItems, event, offerId): void {
    item.offers.map((value) => {
      if (offerId === value.id){
        value.axis = event.target.value;
      }
    });
    console.log(item);
    this.cartObjectService.sendObject(this.cartItems);
  }

  changeSolutionQuantity(item: CartItems, event, solutionId): void {
    item.solutions.map(value => {
      if (solutionId === value.id){
        value.quantity = Number(event.target.value);
      }
    });
    this.cartObjectService.sendObject(this.cartItems);
  }
  changeSelectionOfDeliveryType(): void {
    if (this.deliveryForm.controls.novaPoshta.value === false){
      this.deliveryForm.get('ukrPoshta').setValue(false);
      this.deliveryForm.get('novaPoshta').setValue(true);
    }else if (this.deliveryForm.controls.ukrPoshta.value === false){
      this.deliveryForm.get('ukrPoshta').setValue(true);
      this.deliveryForm.get('novaPoshta').setValue(false);
    }
  }

  changeSelectionOfPaymentType(): void {
    if (this.deliveryForm.controls.inPost.value === false){
      this.deliveryForm.get('byCardPay').setValue(false);
      this.deliveryForm.get('inPost').setValue(true);
      this.priceToPayNow = 0;
      this.priceToPayAfterDelivery = 0;
      this.cartItems.map(value => {
        value.lenses.map(lens => {
          this.priceToPayNow += lens.price * lens.quantity;
        });
        value.offers.map(offer => {
          this.priceToPayNow += offer.price * offer.quantity;
        });
      });
      this.cartItems.map(value => {
        value.drops.map(drop => {
          this.priceToPayAfterDelivery += drop.price * drop.quantity;
        });
        value.solutions.map(solution => {
          this.priceToPayAfterDelivery += solution.price * solution.quantity;
        });
      });
    }else if (this.deliveryForm.controls.byCardPay.value === false){
      this.deliveryForm.get('byCardPay').setValue(true);
      this.deliveryForm.get('inPost').setValue(false);
      this.priceToPayAfterDelivery = 0;
      this.priceToPayNow = this.totalPrice;
    }
  }


  checkOut(): void {
    console.log('-------');
    console.log(this.authUserData);
    this.cartItems.map(items => {
      items.offers.map(offers => {
        this.itemsToSend.map(itemOffer => itemOffer.offers.push({offerId: offers.id}));
      });
      items.lenses.map(lenses => {
        const properties = `Кількість: ${lenses.quantity} Діоптрії: ${lenses.diopters}`;
        this.itemsToSend.map(itemOffer => itemOffer.lenses.push({lenseId: lenses.id, properties}));
      });
      items.drops.map(drops => {
        this.itemsToSend.map(itemOffer => itemOffer.drops.push({dropId: drops.id}));
      });
    });
    let order;
    if (this.authUserData){
       order = {
        createdAt: '2020-09-01 12:18:51',
        totalSumm: this.totalPrice,
        lastName: this.authUserData.lastName,
        firstName: this.authUserData.firstName,
        phone: this.authUserData.phone,
        items: this.itemsToSend,
        user: this.authUserData.id
      };
    }else {
      order = {
        createdAt: '2020-09-01 12:18:51',
        totalSumm: this.totalPrice,
        lastName: this.userDataForm.controls.userFirstName.value,
        firstName: this.userDataForm.controls.userLastName.value,
        phone: this.userDataForm.controls.userPhone.value,
        delivery: {
          cityName: this.userDataForm.controls.userCity.value,
          warehouseNumber: this.userDataForm.controls.userWarehouseNumber.value,
        },
        items: this.itemsToSend,
      };
    }

    console.log(this.itemsToSend);
    console.log(order);
    this.lensService.createOrder(order).subscribe(value => console.log(value));
  }
}
