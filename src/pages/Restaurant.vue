<template>

    <section class="restaurant">

        <div class="gold-overlay"></div>

        <div class="container">


            <!-- ============================= -->
            <!-- TITRE -->
            <!-- ============================= -->

            <div class="title reveal revealOff">

                <img src="../assets/images/logos/logor.jpg" alt="Michelle's Restaurant" class="logo" />

                <h1>
                    Michelle's Restaurant
                </h1>

                <p>
                    African • European • International Cuisine
                </p>

            </div>



            <!-- ============================= -->
            <!-- MENU -->
            <!-- ============================= -->

            <div class="menu">
                <!-- CHARGEMENT -->
                <div v-if="loading" class="message">
                    Chargement des repas...
                </div>


                <!-- AUCUN REPAS -->
                <div v-else-if="meals.length === 0" class="message">
                    Aucun repas disponible pour le moment.
                </div>


                <!-- REPAS -->
                <div v-for="meal in meals" :key="meal.id" class="card reveal revealOff">

                    <!-- BADGE -->
                    <div v-if="meal.statut" class="badge" :class="meal.type">
                        {{ meal.statut }}
                    </div>


                    <!-- IMAGE -->
                    <img v-if="meal.photo" :src="meal.photo" :alt="meal.name" class="meal-image" />

                    <div v-else class="meal-image no-image">
                        🍽️
                    </div>



                    <!-- CONTENU -->
                    <div class="content">

                        <h2>
                            {{ meal.name }}
                        </h2>


                        <!-- NOTE -->
                        <div class="stars">

                            <span v-for="star in 5" :key="star" :class="{
                                inactive:
                                    star > Math.round(meal.rate || 0)
                            }">
                                ⭐
                            </span>

                        </div>


                        <!-- DESCRIPTION -->
                        <p>
                            {{ meal.description }}
                        </p>


                        <!-- BAS DE CARTE -->
                        <div class="bottom">

                            <strong>
                                {{ formatMoney(meal.price) }}
                            </strong>


                            <button @click="addToCart(meal)">
                                🛒 Commander
                            </button>

                        </div>

                    </div>

                </div>

            </div>



            <!-- ============================= -->
            <!-- PANIER -->
            <!-- ============================= -->

            <div v-if="cart.length > 0" class="cart">

                <div class="cart-header">

                    <h2>
                        🛒 Votre commande
                    </h2>

                    <span>
                        {{ cartCount }}
                        article(s)
                    </span>

                </div>


                <!-- ARTICLES -->
                <div v-for="item in cart" :key="item.id" class="cart-item">

                    <img v-if="item.photo" :src="item.photo" :alt="item.name" />

                    <div v-else class="cart-no-image">
                        🍽️
                    </div>


                    <div class="cart-info">

                        <h3>
                            {{ item.name }}
                        </h3>

                        <p>
                            {{ formatMoney(item.price) }}
                        </p>

                    </div>


                    <!-- QUANTITE -->
                    <div class="quantity">

                        <button @click="decreaseQuantity(item)">
                            −
                        </button>

                        <span>
                            {{ item.quantity }}
                        </span>

                        <button @click="increaseQuantity(item)">
                            +
                        </button>

                    </div>


                    <!-- SOUS TOTAL -->
                    <strong class="subtotal">

                        {{
                            formatMoney(
                                item.price * item.quantity
                            )
                        }}

                    </strong>


                    <!-- SUPPRIMER -->
                    <button class="remove" @click="removeFromCart(item)">
                        🗑️
                    </button>

                </div>



                <!-- TOTAL -->
                <div class="cart-footer">

                    <div>

                        <span>
                            Total
                        </span>

                        <strong>
                            {{ formatMoney(cartTotal) }}
                        </strong>

                    </div>


                    <button class="order-button" @click="placeOrder" :disabled="ordering">

                        {{
                            ordering
                                ? "Enregistrement..."
                                : "✅ Valider la commande"
                        }}

                    </button>

                </div>

            </div>
            <!-- ============================= -->
            <!-- FORMULAIRE DE COMMANDE -->
            <!-- ============================= -->

            <div v-if="showOrderForm" class="order-form">

                <div class="order-form-header">

                    <h2>
                        🍽️ Finaliser la commande
                    </h2>

                    <button class="close-order" @click="showOrderForm = false">
                        ✕
                    </button>

                </div>


                <p class="order-intro">
                    Veuillez indiquer le numéro de votre table
                    avant de confirmer la commande.
                </p>


                <!-- NUMERO DE TABLE -->
                <div class="field">

                    <label>
                        Numéro de table
                    </label>

                    <input v-model.trim="orderForm.tableNumber" type="number" min="1" placeholder="Ex : 12" />

                </div>


                <!-- RESUME -->
                <div class="order-summary">

                    <h3>
                        Résumé de la commande
                    </h3>


                    <div v-for="item in cart" :key="item.id" class="summary-item">

                        <span>
                            {{ item.name }}
                            × {{ item.quantity }}
                        </span>

                        <strong>
                            {{
                                formatMoney(
                                    item.price * item.quantity
                            )
                            }}
                        </strong>

                    </div>


                    <div class="summary-total">

                        <span>
                            Total
                        </span>

                        <strong>
                            {{ formatMoney(cartTotal) }}
                        </strong>

                    </div>

                </div>


                <!-- BOUTONS -->
                <div class="order-actions">

                    <button class="cancel-button" @click="showOrderForm = false">
                        Annuler
                    </button>


                    <button class="confirm-button" @click="confirmOrder" :disabled="ordering">

                        {{
                            ordering
                                ? "Enregistrement..."
                                : "✅ Confirmer la commande"
                        }}

                    </button>

                </div>

            </div>

        </div>

    </section>
</template>



<script>

import {
    collection,
    getDocs,
    addDoc
} from "firebase/firestore"

import { db } from "../firebase"
import { log } from "firebase/firestore/pipelines";


export default {

    name: "RestaurantMenu",


    data() {

        return {

            // =========================
            // REPAS
            // =========================

            meals: [],

            loading: true,


            // =========================
            // PANIER
            // =========================

            cart: [],


            // =========================
            // COMMANDE
            // =========================

            ordering: false,

            showOrderForm: false,


            orderForm: {

                tableNumber: ""

            }


        }

    },


    computed: {

        // Nombre total d'articles
        cartCount() {

            return this.cart.reduce(
                (total, item) =>
                    total + item.quantity,
                0
            )

        },


        // Total de la commande
        cartTotal() {

            return this.cart.reduce(
                (total, item) =>
                    total +
                    (Number(item.price) || 0)
                    * item.quantity,
                0
            )

        }

    },


    methods: {


        // =====================================
        // CHARGER LES REPAS DE FIRESTORE
        // =====================================

        async loadMeals() {
    this.loading = true

    try {
        const snapshot = await getDocs(
            collection(db, "meals")
        )

        const meals = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))

        console.log("Repas Firestore :", meals)

        this.meals = meals.filter(meal => {
            return !meal.statut || meal.statut === "Disponible"
        })

        console.log("Repas affichés :", this.meals)

    } catch (error) {
        console.error("Erreur chargement repas :", error)
    } finally {
        this.loading = false
    }
},



        // =====================================
        // AJOUTER AU PANIER
        // =====================================

        addToCart(meal) {

            const existing =
                this.cart.find(
                    item =>
                        item.id === meal.id
                )


            // Si déjà dans le panier
            if (existing) {

                existing.quantity++

                return

            }


            // Sinon nouvel article
            this.cart.push({

                id: meal.id,

                name: meal.name,

                price:
                    Number(meal.price) || 0,

                photo:
                    meal.photo || "",

                quantity: 1

            })


            // Message
            alert(
                `${meal.name} a été ajouté à votre commande.`
            )

        },


        // =====================================
        // AUGMENTER QUANTITE
        // =====================================

        increaseQuantity(item) {

            item.quantity++

        },


        // =====================================
        // DIMINUER QUANTITE
        // =====================================

        decreaseQuantity(item) {

            if (item.quantity > 1) {

                item.quantity--

            } else {

                this.removeFromCart(item)

            }

        },


        // =====================================
        // SUPPRIMER DU PANIER
        // =====================================

        removeFromCart(item) {

            const index =
                this.cart.findIndex(
                    cartItem =>
                        cartItem.id === item.id
                )


            if (index !== -1) {

                this.cart.splice(index, 1)

            }

        },


        // =====================================
        // FORMAT PRIX
        // =====================================

        formatMoney(value) {

            return new Intl.NumberFormat(
                "fr-FR"
            ).format(
                Number(value) || 0
            ) + " $"

        },


        // =====================================
        // ENREGISTRER LA COMMANDE
        // =====================================

        placeOrder() {

            if (this.cart.length === 0) {

                alert(
                    "Votre panier est vide."
                )

                return

            }


            // Ouvrir le formulaire
            this.showOrderForm = true

        },
        async confirmOrder() {

            // Vérifier le numéro de table
            if (!this.orderForm.tableNumber) {

                alert(
                    "Veuillez indiquer le numéro de table."
                )

                return

            }


            if (this.cart.length === 0) {

                alert(
                    "Votre panier est vide."
                )

                return

            }


            this.ordering = true


            try {

                // =========================
                // ARTICLES DE LA COMMANDE
                // =========================

                const items = this.cart.map(item => ({

                    mealId:
                        item.id,

                    name:
                        item.name,

                    price:
                        Number(item.price),

                    quantity:
                        item.quantity,

                    subtotal:
                        Number(item.price)
                        * item.quantity

                }))


                // =========================
                // ENREGISTREMENT FIRESTORE
                // =========================

                await addDoc(

                    collection(
                        db,
                        "orders"
                    ),

                    {

                        // Numéro de table
                        tableNumber:
                            Number(
                                this.orderForm.tableNumber
                            ),


                        // Articles commandés
                        items:
                            items,


                        // Total
                        total:
                            this.cartTotal,


                        // État de la commande
                        status:
                            "En attente",


                        // Date
                        createdAt:
                            new Date()

                    }

                )


                // =========================
                // SUCCÈS
                // =========================

                alert(
                    `✅ Commande enregistrée pour la table ${this.orderForm.tableNumber}.`
                )


                // Vider le panier
                this.cart = []


                // Fermer le formulaire
                this.showOrderForm = false


                // Réinitialiser le numéro de table
                this.orderForm = {

                    tableNumber: ""

                }


            } catch (error) {

                console.error(
                    "Erreur lors de la commande :",
                    error
                )


                alert(
                    "❌ Impossible d'enregistrer la commande."
                )

            } finally {

                this.ordering = false

            }

        },

    },


    mounted() {

        this.loadMeals()

    }

}

</script>



<style scoped>
/* ========================================= */
/* RESTAURANT */
/* ========================================= */

.restaurant {

    position: relative;

    min-height: 100vh;

    background:
        radial-gradient(circle at top,
            rgba(212, 175, 55, .18),
            transparent 40%),
        #090909;

    padding: 120px 0;

    overflow: hidden;

}


.gold-overlay {

    position: absolute;

    inset: 0;

    background-image:
        radial-gradient(rgba(212, 175, 55, .08) 1px,
            transparent 1px);

    background-size: 35px 35px;

    pointer-events: none;

}


.container {

    width: 90%;

    max-width: 1400px;

    margin: auto;

    position: relative;

}


/* ========================================= */
/* TITRE */
/* ========================================= */

.title {

    text-align: center;

}


.logo {

    width: 130px;

    height: 130px;

    border-radius: 50%;

    border: 4px solid #d4af37;

    object-fit: cover;

}


.title h1 {

    font-size: 60px;

    color: #d4af37;

    margin: 20px 0;

}


.title p {

    font-size: 20px;

    color: #ddd;

}


/* ========================================= */
/* MENU */
/* ========================================= */

.menu {

    margin-top: 70px;

    display: grid;

    grid-template-columns:
        repeat(auto-fit,
            minmax(300px, 1fr));

    gap: 35px;

}


.card {

    background:
        linear-gradient(145deg,
            #202020,
            #111);

    border-radius: 25px;

    overflow: hidden;

    position: relative;

    transition: .5s;

}


.card:hover {

    transform:
        translateY(-15px);

    box-shadow:
        0 25px 60px rgba(212, 175, 55, .25);

}


.meal-image {

    width: 100%;

    height: 260px;

    object-fit: cover;

}


.no-image {

    display: flex;

    align-items: center;

    justify-content: center;

    background: #181818;

    font-size: 70px;

}


/* ========================================= */
/* BADGE */
/* ========================================= */

.badge {

    position: absolute;

    top: 20px;

    left: 20px;

    padding: 8px 18px;

    border-radius: 30px;

    font-weight: bold;

    z-index: 2;

}


.popular {

    background: #d4af37;

    color: #111;

}


.chef {

    background: #fff;

    color: #111;

}


.spicy {

    background: #c0392b;

    color: white;

}


/* ========================================= */
/* CONTENU */
/* ========================================= */

.content {

    padding: 25px;

}


.content h2 {

    color: #fff;

    font-size: 28px;

    margin-top: 0;

}


.stars {

    margin: 10px 0;

    font-size: 18px;

}


.stars .inactive {

    filter: grayscale(1);

    opacity: .25;

}


.content p {

    color: #bbb;

    line-height: 1.6;

    min-height: 50px;

}


/* ========================================= */
/* BAS CARTE */
/* ========================================= */

.bottom {

    display: flex;

    justify-content: space-between;

    align-items: center;

    gap: 15px;

    margin-top: 25px;

}


.bottom strong {

    color: #d4af37;

    font-size: 22px;

}


button {

    background: #d4af37;

    border: none;

    padding: 12px 25px;

    border-radius: 30px;

    font-weight: bold;

    cursor: pointer;

    transition: .3s;

}


button:hover {

    transform: scale(1.05);

}


button:disabled {

    opacity: .6;

    cursor: not-allowed;

}

/* ========================================= */
/* FORMULAIRE COMMANDE */
/* ========================================= */

.order-form {

    margin-top: 30px;

    padding: 30px;

    background:
        linear-gradient(145deg,
            #252525,
            #111);

    border: 1px solid rgba(212, 175, 55, .5);

    border-radius: 25px;

    box-shadow:
        0 20px 60px rgba(0, 0, 0, .6);

}


.order-form-header {

    display: flex;

    justify-content: space-between;

    align-items: center;

    border-bottom: 1px solid #333;

    padding-bottom: 15px;

}


.order-form-header h2 {

    color: #d4af37;

    margin: 0;

}


.close-order {

    background: #c0392b;

    color: white;

    width: 40px;

    height: 40px;

    padding: 0;

    border-radius: 50%;

    font-size: 18px;

}


.order-intro {

    color: #aaa;

    margin: 20px 0;

}


.field {

    display: flex;

    flex-direction: column;

    gap: 8px;

}


.field label {

    color: white;

    font-weight: bold;

}


.field input {

    width: 100%;

    box-sizing: border-box;

    padding: 14px;

    border-radius: 10px;

    border: 1px solid #444;

    background: #1b1b1b;

    color: white;

    font-size: 16px;

}


.field input:focus {

    outline: none;

    border-color: #d4af37;

}


/* ========================================= */
/* RESUME */
/* ========================================= */

.order-summary {

    margin-top: 25px;

    padding: 20px;

    background: #0d0d0d;

    border-radius: 15px;

}


.order-summary h3 {

    color: #d4af37;

    margin-top: 0;

}


.summary-item {

    display: flex;

    justify-content: space-between;

    align-items: center;

    padding: 10px 0;

    border-bottom: 1px solid #292929;

    color: #ddd;

}


.summary-item strong {

    color: #d4af37;

}


.summary-total {

    display: flex;

    justify-content: space-between;

    align-items: center;

    margin-top: 20px;

    padding-top: 15px;

    border-top: 2px solid #d4af37;

    color: white;

}


.summary-total strong {

    color: #d4af37;

    font-size: 25px;

}


/* ========================================= */
/* ACTIONS */
/* ========================================= */

.order-actions {

    display: flex;

    justify-content: flex-end;

    gap: 15px;

    margin-top: 25px;

}


.cancel-button {

    background: #444;

    color: white;

}


.confirm-button {

    background: #d4af37;

    color: #111;

}


.confirm-button:disabled {

    opacity: .5;

    cursor: not-allowed;

}


/* ========================================= */
/* MOBILE */
/* ========================================= */

@media(max-width:700px) {

    .order-form {

        padding: 20px;

    }


    .order-actions {

        flex-direction: column;

    }


    .order-actions button {

        width: 100%;

    }


    .summary-item {

        gap: 15px;

    }

}

/* ========================================= */
/* MESSAGE */
/* ========================================= */

.message {

    grid-column: 1 / -1;

    text-align: center;

    color: #ddd;

    padding: 50px;

    font-size: 20px;

}


/* ========================================= */
/* PANIER */
/* ========================================= */

.cart {

    margin-top: 70px;

    background:
        linear-gradient(145deg,
            #202020,
            #111);

    border: 1px solid rgba(212, 175, 55, .35);

    border-radius: 25px;

    padding: 30px;

    box-shadow:
        0 20px 60px rgba(0, 0, 0, .5);

}


.cart-header {

    display: flex;

    justify-content: space-between;

    align-items: center;

    margin-bottom: 25px;

    border-bottom: 1px solid #333;

    padding-bottom: 20px;

}


.cart-header h2 {

    color: #d4af37;

    margin: 0;

}


.cart-header span {

    color: #bbb;

}


/* ========================================= */
/* ARTICLE PANIER */
/* ========================================= */

.cart-item {

    display: flex;

    align-items: center;

    gap: 15px;

    padding: 15px 0;

    border-bottom: 1px solid #292929;

}


.cart-item img,
.cart-no-image {

    width: 70px;

    height: 70px;

    object-fit: cover;

    border-radius: 12px;

}


.cart-no-image {

    display: flex;

    justify-content: center;

    align-items: center;

    background: #1b1b1b;

    font-size: 30px;

}


.cart-info {

    flex: 1;

}


.cart-info h3 {

    color: white;

    margin: 0 0 5px;

}


.cart-info p {

    color: #d4af37;

    margin: 0;

}


/* ========================================= */
/* QUANTITE */
/* ========================================= */

.quantity {

    display: flex;

    align-items: center;

    gap: 10px;

}


.quantity button {

    width: 35px;

    height: 35px;

    padding: 0;

    border-radius: 50%;

}


.quantity span {

    color: white;

    min-width: 20px;

    text-align: center;

}


/* ========================================= */
/* SOUS TOTAL */
/* ========================================= */

.subtotal {

    color: #d4af37;

    min-width: 100px;

    text-align: right;

}


/* ========================================= */
/* SUPPRESSION */
/* ========================================= */

.remove {

    background: #c0392b;

    color: white;

    padding: 8px 12px;

}


/* ========================================= */
/* FOOTER PANIER */
/* ========================================= */

.cart-footer {

    display: flex;

    justify-content: space-between;

    align-items: center;

    margin-top: 25px;

    gap: 20px;

}


.cart-footer div {

    display: flex;

    flex-direction: column;

    gap: 5px;

}


.cart-footer div span {

    color: #aaa;

}


.cart-footer strong {

    color: #d4af37;

    font-size: 28px;

}


.order-button {

    padding: 15px 30px;

    font-size: 16px;

}


/* ========================================= */
/* ANIMATION */
/* ========================================= */



.show {

    opacity: 1;

    transform: none;

}


/* ========================================= */
/* MOBILE */
/* ========================================= */

@media(max-width:700px) {

    .restaurant {

        padding: 80px 0;

    }


    .title h1 {

        font-size: 38px;

    }


    .title p {

        font-size: 16px;

    }


    .cart {

        padding: 20px;

    }


    .cart-item {

        flex-wrap: wrap;

    }


    .cart-info {

        min-width: 150px;

    }


    .subtotal {

        margin-left: auto;

    }


    .cart-footer {

        flex-direction: column;

        align-items: stretch;

    }


    .order-button {

        width: 100%;

    }

}
</style>
