<template>

<div class="page">

    <!-- HEADER -->
    <div class="header">
        <h2>🍽️ Gestion des repas</h2>
    </div>


    <!-- AJOUT / MODIFICATION -->
    <div class="card">

        <h3>
            {{ editMode ? "Modifier un repas" : "Ajouter un repas" }}
        </h3>

        <div class="form">

            <!-- PHOTO -->
            <div class="image-box">

                <img
                    v-if="form.photo"
                    :src="form.photo"
                    alt="Photo du repas"
                />

                <span v-else>
                    🍽️
                </span>

                <input
                    type="file"
                    accept="image/*"
                    @change="convertImage"
                />

            </div>


            <!-- NOM -->
            <input
                v-model.trim="form.name"
                type="text"
                placeholder="Nom du repas"
            />


            <!-- PRIX -->
            <input
                v-model.number="form.price"
                type="number"
                min="0"
                step="0.01"
                placeholder="Prix du repas"
            />


            <!-- RATE -->
            <input
                v-model.number="form.rate"
                type="number"
                min="0"
                max="5"
                step="0.1"
                placeholder="Note / taux (ex: 4.5)"
            />


            <!-- DESCRIPTION -->
            <textarea
                v-model.trim="form.description"
                placeholder="Description du repas"
                rows="4"
            ></textarea>


            <!-- STATUT -->
            <select v-model="form.statut">

                <option value="Disponible">
                    Disponible
                </option>

                <option value="Indisponible">
                    Indisponible
                </option>

            </select>


            <!-- BOUTONS -->
            <div class="buttons">

                <button
                    class="btn primary"
                    @click="saveMeal"
                >
                    {{ editMode ? "✏️ Modifier" : "➕ Ajouter" }}
                </button>


                <button
                    v-if="editMode"
                    class="btn cancel"
                    @click="reset"
                >
                    Annuler
                </button>

            </div>

        </div>

    </div>



    <!-- RECHERCHE -->
    <div class="card">

        <input
            v-model.trim="search"
            type="text"
            placeholder="🔎 Rechercher un repas..."
        />

    </div>



    <!-- LISTE DES REPAS -->
    <div class="card">

        <h3>
            🍽️ Repas disponibles
        </h3>


        <div
            v-if="paginatedMeals.length === 0"
            class="empty"
        >
            Aucun repas trouvé.
        </div>


        <div
            v-for="meal in paginatedMeals"
            :key="meal.id"
            class="Meal"
        >

            <!-- PHOTO -->
            <img
                v-if="meal.photo"
                :src="meal.photo"
                :alt="meal.name"
            />

            <div
                v-else
                class="no-image"
            >
                🍽️
            </div>


            <!-- INFORMATIONS -->
            <div class="info">

                <strong>
                    {{ meal.name }}
                </strong>


                <p v-if="meal.description">
                    {{ meal.description }}
                </p>


                <div class="details">

                    <span class="price">
                        {{ formatMoney(meal.price) }}
                    </span>


                    <span
                        v-if="meal.rate !== null && meal.rate !== undefined"
                        class="rate"
                    >
                        ⭐ {{ meal.rate }}/5
                    </span>


                    <span
                        class="status"
                        :class="{
                            available: meal.statut === 'Disponible',
                            unavailable: meal.statut === 'Indisponible'
                        }"
                    >
                        {{ meal.statut }}
                    </span>

                </div>

            </div>


            <!-- ACTIONS -->
            <div class="actions">

                <button
                    class="edit"
                    @click="editMeal(meal)"
                    title="Modifier"
                >
                    ✏️
                </button>


                <button
                    class="delete"
                    @click="removeMeal(meal)"
                    title="Supprimer"
                >
                    🗑️
                </button>

            </div>

        </div>



        <!-- PAGINATION -->
        <div
            v-if="totalPages > 1"
            class="pagination"
        >

            <button
                @click="page--"
                :disabled="page === 1"
            >
                ⬅️
            </button>


            <span>
                Page {{ page }} / {{ totalPages }}
            </span>


            <button
                @click="page++"
                :disabled="page === totalPages"
            >
                ➡️
            </button>

        </div>

    </div>

</div>

</template>


<script>

import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc
} from "firebase/firestore"

import { db } from "../firebase"


export default {


    data() {

        return {

            // Liste des repas
            meals: [],

            // Recherche
            search: "",

            // Pagination
            page: 1,
            pageSize: 6,

            // Mode modification
            editMode: false,
            editId: null,

            // Formulaire
            form: {

                name: "",
                price: null,
                rate: null,
                description: "",
                statut: "Disponible",
                photo: ""

            }

        }

    },


    computed: {

        // Filtrer les repas
        filteredMeals() {

            const search = this.search.toLowerCase()

            return this.meals.filter(meal => {

                return (
                    (meal.name || "")
                        .toLowerCase()
                        .includes(search)

                    ||

                    (meal.description || "")
                        .toLowerCase()
                        .includes(search)
                )

            })

        },


        // Nombre total de pages
        totalPages() {

            return Math.ceil(
                this.filteredMeals.length / this.pageSize
            ) || 1

        },


        // Repas de la page actuelle
        paginatedMeals() {

            const start =
                (this.page - 1) * this.pageSize

            return this.filteredMeals.slice(
                start,
                start + this.pageSize
            )

        }

    },


    watch: {

        // Si la recherche change,
        // revenir à la première page
        search() {

            this.page = 1

        }

    },


    methods: {

        // ==========================================
        // CHARGER LES REPAS
        // ==========================================

        async loadMeals() {

            try {

                const snap = await getDocs(
                    collection(db, "meals")
                )

                this.meals = snap.docs.map(item => ({

                    id: item.id,

                    ...item.data()

                }))

            } catch (error) {

                console.error(
                    "Erreur chargement repas :",
                    error
                )

                alert(
                    "Impossible de charger les repas."
                )

            }

        },


        // ==========================================
        // CONVERTIR IMAGE EN BASE64
        // ==========================================

        convertImage(event) {

            const file =
                event.target.files[0]

            if (!file)
                return


            // Vérifier le type
            if (!file.type.startsWith("image/")) {

                alert(
                    "Veuillez sélectionner une image."
                )

                return

            }


            // Limite 2 MB
            if (file.size > 2 * 1024 * 1024) {

                alert(
                    "L'image ne doit pas dépasser 2 MB."
                )

                return

            }


            const reader =
                new FileReader()


            reader.onload = () => {

                this.form.photo =
                    reader.result

            }


            reader.readAsDataURL(file)

        },


        // ==========================================
        // AJOUTER / MODIFIER UN REPAS
        // ==========================================

        async saveMeal() {

            // Vérification du nom
            if (!this.form.name) {

                alert(
                    "Le nom du repas est obligatoire."
                )

                return

            }


            // Vérification du prix
            if (
                this.form.price === null ||
                this.form.price === "" ||
                this.form.price < 0
            ) {

                alert(
                    "Veuillez entrer un prix valide."
                )

                return

            }


            const data = {

                name: this.form.name,

                price: Number(this.form.price),

                rate:
                    this.form.rate === null ||
                    this.form.rate === ""
                        ? null
                        : Number(this.form.rate),

                description:
                    this.form.description,

                statut:
                    this.form.statut,

                photo:
                    this.form.photo,

                updatedAt:
                    new Date()

            }


            try {

                // MODIFICATION
                if (this.editMode) {

                    await updateDoc(

                        doc(
                            db,
                            "meals",
                            this.editId
                        ),

                        data

                    )

                    alert(
                        "Repas modifié avec succès."
                    )

                }


                // AJOUT
                else {

                    await addDoc(

                        collection(
                            db,
                            "meals"
                        ),

                        {

                            ...data,

                            createdAt:
                                new Date()

                        }

                    )

                    alert(
                        "Repas ajouté avec succès."
                    )

                }


                // Reset
                this.reset()

                // Recharger
                await this.loadMeals()

            } catch (error) {

                console.error(
                    "Erreur sauvegarde repas :",
                    error
                )

                alert(
                    "Une erreur est survenue."
                )

            }

        },


        // ==========================================
        // MODIFIER UN REPAS
        // ==========================================

        editMeal(meal) {

            this.editMode = true

            this.editId = meal.id


            this.form = {

                name:
                    meal.name || "",

                price:
                    meal.price ?? null,

                rate:
                    meal.rate ?? null,

                description:
                    meal.description || "",

                statut:
                    meal.statut || "Disponible",

                photo:
                    meal.photo || ""

            }


            window.scrollTo({

                top: 0,

                behavior: "smooth"

            })

        },


        // ==========================================
        // SUPPRIMER UN REPAS
        // ==========================================

        async removeMeal(meal) {

            const confirmed =
                confirm(
                    `Voulez-vous supprimer le repas "${meal.name}" ?`
                )


            if (!confirmed)
                return


            try {

                await deleteDoc(

                    doc(
                        db,
                        "meals",
                        meal.id
                    )

                )


                await this.loadMeals()


                // Éviter une page vide après suppression
                if (
                    this.page > this.totalPages
                ) {

                    this.page =
                        this.totalPages

                }


            } catch (error) {

                console.error(
                    "Erreur suppression :",
                    error
                )

                alert(
                    "Impossible de supprimer le repas."
                )

            }

        },


        // ==========================================
        // RESET FORMULAIRE
        // ==========================================

        reset() {

            this.editMode = false

            this.editId = null


            this.form = {

                name: "",

                price: null,

                rate: null,

                description: "",

                statut: "Disponible",

                photo: ""

            }

        },


        // ==========================================
        // FORMAT PRIX
        // ==========================================

        formatMoney(value) {

            const amount =
                Number(value) || 0

            return new Intl.NumberFormat(
                "fr-FR"
            ).format(amount) + " $"

        }

    },


    mounted() {

        this.loadMeals()

    }

}

</script>


<style scoped>

.page {

    max-width: 1000px;

    margin: auto;

    padding: 20px;

}


.header {

    margin-bottom: 20px;

}


.card {

    background: white;

    padding: 18px;

    border-radius: 14px;

    margin-bottom: 20px;

    box-shadow:
        0 5px 15px rgba(0, 0, 0, .08);

}


.form {

    display: flex;

    flex-direction: column;

    gap: 12px;

}


input,
textarea,
select {

    width: 100%;

    box-sizing: border-box;

    padding: 12px;

    border-radius: 8px;

    border: 1px solid #ddd;

    font-family: inherit;

}


textarea {

    resize: vertical;

}


.image-box {

    display: flex;

    flex-direction: column;

    align-items: flex-start;

    gap: 10px;

}


.image-box img {

    width: 140px;

    height: 140px;

    object-fit: cover;

    border-radius: 12px;

}


.image-box span {

    display: flex;

    align-items: center;

    justify-content: center;

    width: 140px;

    height: 140px;

    font-size: 70px;

    background: #f5f5f5;

    border-radius: 12px;

}


.buttons {

    display: flex;

    gap: 10px;

}


.btn {

    padding: 12px 18px;

    border: none;

    border-radius: 8px;

    cursor: pointer;

    font-weight: 600;

}


.primary {

    background: #16803c;

    color: white;

}


.cancel {

    background: #e5e7eb;

    color: #333;

}


.Meal {

    display: flex;

    align-items: center;

    gap: 15px;

    padding: 12px 0;

    border-bottom: 1px solid #eee;

}


.Meal > img,
.no-image {

    width: 90px;

    height: 90px;

    object-fit: cover;

    border-radius: 10px;

}


.no-image {

    display: flex;

    align-items: center;

    justify-content: center;

    background: #f5f5f5;

    font-size: 40px;

}


.info {

    flex: 1;

}


.info strong {

    font-size: 18px;

}


.info p {

    margin: 6px 0;

    color: #666;

}


.details {

    display: flex;

    flex-wrap: wrap;

    gap: 10px;

    align-items: center;

}


.price {

    font-weight: bold;

    color: #16803c;

}


.rate {

    color: #d97706;

}


.status {

    padding: 4px 8px;

    border-radius: 20px;

    font-size: 12px;

    font-weight: 600;

}


.available {

    background: #dcfce7;

    color: #166534;

}


.unavailable {

    background: #fee2e2;

    color: #991b1b;

}


.actions {

    display: flex;

    gap: 5px;

}


.actions button {

    border: none;

    padding: 8px;

    border-radius: 6px;

    cursor: pointer;

}


.edit {

    background: #facc15;

}


.delete {

    background: #ef4444;

    color: white;

}


.pagination {

    display: flex;

    justify-content: center;

    align-items: center;

    gap: 20px;

    margin-top: 20px;

}


.pagination button {

    border: none;

    padding: 8px 12px;

    border-radius: 6px;

    cursor: pointer;

}


.pagination button:disabled {

    opacity: .4;

    cursor: not-allowed;

}


.empty {

    text-align: center;

    padding: 30px;

    color: #777;

}


@media (max-width: 700px) {

    .Meal {

        flex-direction: column;

        align-items: flex-start;

    }


    .Meal > img,
    .no-image {

        width: 100%;

        height: 180px;

    }


    .actions {

        width: 100%;

    }

}

</style>
