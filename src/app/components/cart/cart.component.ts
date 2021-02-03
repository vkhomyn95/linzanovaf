import { Component, OnDestroy, OnInit, AfterContentInit} from '@angular/core';
import {CartObjectService} from '../../services/components-data/cart-object.service';
import {CartItems} from '../../models/order/CartItems';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../../services/token-storage.service';
import {CabinetService} from '../../services/cabinet.service';
import {LensService} from '../../services/lens.service';
import {Items, OrderToSend} from '../../models/order/OrderToSend';
import {lensAxis, lensBCValues, lensCylinder, lenseDiopters, lenseQuantity} from '../../constants/lense/lenses';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SettlementsService} from '../../services/settlements.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CartDialogSuccessComponent} from '../cart-dialog-success/cart-dialog-success.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  orderStep = 0;
  cartItems: CartItems[]; cartLensesValidation; cartListErrors: string[] = []; cartErrorMsg = false;
  totalPrice = 0; priceToPayAfterDelivery = 0; priceToPayNow = 0;
  cartItemsQuantity = 0;
  authUserData;
  itemsToSend: Items[] = [{
    offers: [],
    drops: [],
    lenses: [],
    solutions: []
  }];
  lenseQuantity; lenseDiopters; lensBC; lensCylinder; lensAxis;
  focusedLocation: boolean; focusedNumber: boolean; locationNPList: any[]; numberNPList: any[];
  userDataForm: FormGroup;  authUserDataForm;
  deliveryForm: FormGroup;
  dialogRef: MatDialogRef<CartDialogSuccessComponent>;
  isBannerVisible = true;


  constructor(private cartObjectService: CartObjectService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private token: TokenStorageService,
              private cabinetService: CabinetService,
              private lensService: LensService,
              private settlementsService: SettlementsService,
              private modal: MatDialog) {
    this.userDataForm = new FormGroup({
      userFirstName: new FormControl('', [Validators.required]),
      userLastName: new FormControl('', [Validators.required]),
      patronymic: new FormControl('', [Validators.required]),
      userPhone: new FormControl('', [Validators.required]),
      userEmail: new FormControl('', [Validators.required]),
      userCity: new FormControl('', [Validators.required]),
      userWarehouseNumber: new FormControl('', [Validators.required]),
      userPostIndex: new FormControl('', [Validators.required]),
      aboutWarehouse: new FormControl(''),
      customerComment: new FormControl('')
    });
    this.authUserDataForm = new FormGroup({
      userAuthPostIndex: new FormControl('', [Validators.required]),
      customerAuthComment: new FormControl('')
    });
    this.deliveryForm = new FormGroup({
      novaPoshta: new FormControl(false),
      ukrPoshta: new FormControl(false),
      inPost: new FormControl(false),
      byCardPay: new FormControl(false)
    });
    this.lenseQuantity = lenseQuantity; this.lenseDiopters = lenseDiopters; this.lensBC = lensBCValues;
    this.lensAxis = lensAxis; this.lensCylinder = lensCylinder;
  }

  ngOnInit(): void {
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
    if (this.orderStep === 0) {
      if (cartItems[0].lenses.length !== 0){
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
      }

      if (cartItems[0].offers.length !== 0){
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
      }
      if (cartItems[0].lenses.length !== 0 || cartItems[0].offers.length !== 0){
        if (!this.cartLensesValidation){
          return;
        }else {
          this.orderStep += 1;
        }
      }else if (cartItems[0].solutions.length !== 0 || cartItems[0].drops.length !== 0) {
        this.orderStep += 1;
      }
    }

    if (this.orderStep === 1){
      console.log(this.deliveryForm.controls.byCardPay.value);
      console.log(this.deliveryForm.controls.inPost.value);
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
  }

  prevStep(): void {
    if (this.orderStep === 0) {
      return;
    }
    this.orderStep -= 1;
  }

  deleteCareFromList(careIndex): void {
    this.cartItems.map(value => {
      value.drops.splice(careIndex, 1);
    });
    this.cartObjectService.sendObject(this.cartItems);
  }
  deleteLenseFromList(lensId): void {
    this.cartItems.map(value => {
      value.lenses.splice(lensId, 1);
    });
    this.cartObjectService.sendObject(this.cartItems);
  }
  deleteOfferFromList(offerId): void {
    this.cartItems.map(value => {
      value.offers.splice(offerId, 1);
    });
    this.cartObjectService.sendObject(this.cartItems);
  }
  deleteSolutionFromList(solutionId): void {
    this.cartItems.map(value => {
      value.solutions.splice(solutionId, 1);
    });
    this.cartObjectService.sendObject(this.cartItems);
  }

  changeDropsQuantity(item, event): void {
    item.quantity = Number(event.target.value);
    this.cartObjectService.sendObject(this.cartItems);
  }

  changeLensesQuantity(item, event): void {
    item.quantity = Number(event.target.value);
    this.cartObjectService.sendObject(this.cartItems);
  }
  changeLensBc(item, event): void {
    item.defaultBC = event.target.value;
    this.cartObjectService.sendObject(this.cartItems);
  }
  changeDiopters(item, event): void {
    item.diopters = event.target.value;
    this.cartObjectService.sendObject(this.cartItems);
  }
  changeLensCylinder(item, event): void {
    item.cylinder = event.target.value;
    this.cartObjectService.sendObject(this.cartItems);
  }
  changeLensAxis(item, event): void {
    item.axis = event.target.value;
    this.cartObjectService.sendObject(this.cartItems);
  }

  changeOfferBc(item, event): void {
    item.defaultBC = event.target.value;
    this.cartObjectService.sendObject(this.cartItems);
  }
  changeOfferDiopters(item, event): void {
    item.diopters = event.target.value;
    this.cartObjectService.sendObject(this.cartItems);
  }
  changeOfferCylinder(item, event): void {
    item.cylinder = event.target.value;
    this.cartObjectService.sendObject(this.cartItems);
  }
  changeOfferAxis(item, event): void {
    item.axis = event.target.value;
    this.cartObjectService.sendObject(this.cartItems);
  }

  changeSolutionQuantity(item, event): void {
    item.quantity = Number(event.target.value);
    this.cartObjectService.sendObject(this.cartItems);
  }
  changeSelectionOfDeliveryType(deliveryId): void {
    if (deliveryId === 0){
      this.deliveryForm.get('novaPoshta').setValue(true);
      this.deliveryForm.get('ukrPoshta').setValue(false);
    }else if (deliveryId === 1){
      this.deliveryForm.get('ukrPoshta').setValue(true);
      this.deliveryForm.get('novaPoshta').setValue(false);
    }
  }

  changeSelectionOfPaymentType(paymentId): void {
    if (paymentId === 0){
      this.deliveryForm.get('inPost').setValue(true);
      this.deliveryForm.get('byCardPay').setValue(false);
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
    }else if (paymentId === 1){
      this.deliveryForm.get('byCardPay').setValue(true);
      this.deliveryForm.get('inPost').setValue(false);
      this.priceToPayAfterDelivery = 0;
      this.priceToPayNow = this.totalPrice;
    }
  }
  valueChangedLocation(target): void {
    this.settlementsService.getSettlements(target.value).subscribe(value => {
      if (value.data[0]){
        this.locationNPList = value.data[0].Addresses;
      }
    });
  }
  setSettlements(): void {
    setTimeout(() => {
      this.focusedLocation = false;
      this.focusedNumber = false;
    }, 100);
  }
  addLocationToForm(location: any): void {
    this.userDataForm.get('userCity').setValue(location.Present);
    this.settlementsService.getWarehouses(location.DeliveryCity).subscribe(value => {
      this.numberNPList = value.data;
    });
  }

  addNumberToForm(location: any): void {
    this.userDataForm.get('userWarehouseNumber').setValue(location.Number);
    this.userDataForm.get('aboutWarehouse').setValue(location.ShortAddress + ' ' + location.Description);
  }

  setWarehouse(): void {
    setTimeout(() => {
      this.focusedNumber = false;
    }, 100);
  }
  toUpdateUserNPDeliveryAddress(): void {
    this.router.navigate(['cabinet/user']);
  }


  checkOut(): void {
    if (this.userDataForm.controls.userFirstName.valid && this.userDataForm.controls.userLastName.valid &&
        this.userDataForm.controls.userPhone.valid && this.userDataForm.controls.userEmail.valid || this.authUserData){
      if (this.deliveryForm.controls.novaPoshta.value === true && this.userDataForm.controls.userCity.valid &&
          this.userDataForm.controls.userWarehouseNumber.valid ||
          this.deliveryForm.controls.ukrPoshta.value === true && this.userDataForm.controls.userPostIndex.valid || this.authUserData){
        this.cartItems.map(items => {
          items.offers.map(offers => {
            const properties = `Діоптрії: ${offers.diopters} ` + (offers.hasCylinder ? `Циліндр: ${offers.cylinder} ` : ' ') + (offers.hasAxis ? `Вісь: ${offers.axis}` : ' ') + ` Кривизна: ${offers.defaultBC} Діаметр: ${offers.defaultDiameter} \n`;
            this.itemsToSend.map(itemOffer => itemOffer.offers.push({offerId: offers.id, properties}));
          });
          items.lenses.map(lenses => {
            const properties = `Кількість: ${lenses.quantity} Діоптрії: ${lenses.diopters} ` + (lenses.hasCylinder ? `Циліндр: ${lenses.cylinder} ` : ' ') + (lenses.hasAxis ? `Вісь: ${lenses.axis}` : ' ') + ` Кривизна: ${lenses.defaultBC} Діаметр: ${lenses.defaultDiameter} \n`;
            this.itemsToSend.map(itemOffer => itemOffer.lenses.push({lenseId: lenses.id, properties}));
          });
          items.drops.map(drops => {
            const properties = `Кількість: ${drops.quantity} Об'єм: ${drops.cvalue} \n`;
            this.itemsToSend.map(itemOffer => itemOffer.drops.push({dropId: drops.id, properties}));
          });
          items.solutions.map(solutions => {
            const properties = `Кількість: ${solutions.quantity} Об'єм: ${solutions.solutionValue} \n`;
            this.itemsToSend.map(itemOffer => itemOffer.solutions.push({solutionId: solutions.id, properties}));
          });
        });
        let order;
        if (this.authUserData){
          let deliveryType;
          let paymentType;
          if (this.deliveryForm.controls.novaPoshta.value === true){
            deliveryType = 'np';
          }else{
            deliveryType = 'ukr';
          }
          if (this.deliveryForm.controls.inPost.value === true){
            paymentType = 'inPost';
          }else if (this.deliveryForm.controls.byCardPay.value === true){
            paymentType = 'byCardPay';
          }
          order = {
            lastName: this.authUserData.lastName,
            firstName: this.authUserData.firstName,
            patronymic: this.authUserData.patronymic,
            phone: this.authUserData.phone,
            email: this.authUserData.email,
            customerComment: this.authUserDataForm.controls.customerAuthComment.value,
            delivery: {
              cityName: this.authUserData.location,
              warehouseNumber: this.authUserData.number,
              description: this.authUserData.warehouse,
              postIndex: this.authUserData.postIndex,
              deliveryType: deliveryType.toString(),
              paymentType: paymentType.toString()
            },
            items: this.itemsToSend,
            user: this.authUserData.id
          };
        }else {
          let deliveryType;
          let paymentType;
          if (this.deliveryForm.controls.novaPoshta.value === true){
            deliveryType = 'np';
          }else{
            deliveryType = 'ukr';
          }
          if (this.deliveryForm.controls.inPost.value === true){
            paymentType = 'inPost';
          }else if (this.deliveryForm.controls.byCardPay.value === true){
            paymentType = 'byCardPay';
          }
          order = {
            lastName: this.userDataForm.controls.userLastName.value,
            firstName: this.userDataForm.controls.userFirstName.value,
            patronymic: this.userDataForm.controls.patronymic.value,
            phone: this.userDataForm.controls.userPhone.value,
            email: this.userDataForm.controls.userEmail.value,
            customerComment: this.userDataForm.controls.customerComment.value,
            delivery: {
              cityName: this.userDataForm.controls.userCity.value,
              warehouseNumber: this.userDataForm.controls.userWarehouseNumber.value,
              postIndex: this.userDataForm.controls.userPostIndex.value,
              deliveryType: deliveryType.toString(),
              paymentType: paymentType.toString(),
              description: this.userDataForm.controls.aboutWarehouse.value
            },
            items: this.itemsToSend
          };
        }
        console.log(order);
        this.lensService.createOrder(order).toPromise()
          .then((response) => {
            if (response){
              this.cartObjectService.clearObjects();
              this.cartObjectService.setObject();
              this.dialogRef = this.modal.open(CartDialogSuccessComponent, {
                disableClose: true
              });
              this.dialogRef.afterClosed().subscribe(value => {
                if (value){
                  this.router.navigateByUrl('/').then(() => {
                    window.location.reload();
                  });
                }
              });
            }
        })
          .catch(err => this.handleError(err));
      }else {
        return;
      }
    }
  }
  public handleError(error: any): Promise<never> {
    if (error.status === 401) {
      console.log(401);
    } else if (error.status === 400) {
      console.log(400);
    }
    return Promise.reject(error);
  }

  hideBanner(): void {
    this.isBannerVisible = false;
  }
}
