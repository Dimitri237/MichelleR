<template>
    <header :class="['navbar', { scrolled }]">
        <div class="container nav-content">

            <!-- Logo -->
            <RouterLink to="/" class="brand" @click="closeMenu">
                <img src="../assets/images/logos/logor.jpg" alt="Michelle's Restaurant" class="logo" :class="{ small: scrolled }" />
            </RouterLink>

            <!-- Navigation -->
            <nav :class="{ active: mobileMenu }">

                <RouterLink @click="closeMenu" to="/">
                    {{ t("nav.home") }}
                </RouterLink>

                <RouterLink @click="closeMenu" to="/restaurant">
                    {{ t("nav.restaurant") }}
                </RouterLink>

                <RouterLink @click="closeMenu" to="/gallery">
                    {{ t("nav.gallery") }}
                </RouterLink>

                <RouterLink @click="closeMenu" to="/about">
                    {{ t("nav.about") }}
                </RouterLink>

                <RouterLink @click="closeMenu" to="/contact">
                    {{ t("nav.contact") }}
                </RouterLink>

            </nav>

            <!-- Actions -->
            <div class="actions">

                <div class="lang">

                    <button :class="{ active: language === 'en' }" @click="changeLanguage('en')">
                        🇬🇧 EN
                    </button>

                    <button :class="{ active: language === 'fr' }" @click="changeLanguage('fr')">
                        🇫🇷 FR
                    </button>

                </div>

                <button class="menu-btn" @click="toggleMenu">

                    <i :class="mobileMenu
                        ? 'fas fa-times'
                        : 'fas fa-bars'">
                    </i>

                </button>

            </div>

        </div>
    </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useLanguage } from "../composables/useLanguage";
import { useRouter } from "vue-router";

const router = useRouter();
router.afterEach(() => {
    closeMenu();
});
const {
    language,
    t,
    changeLanguage
} = useLanguage();

const mobileMenu = ref(false);
const scrolled = ref(false);

const toggleMenu = () => {
    mobileMenu.value = !mobileMenu.value;
};

const closeMenu = () => {
    mobileMenu.value = false;
};

const handleScroll = () => {
    scrolled.value = window.scrollY > 40;
};

const handleResize = () => {
    if (window.innerWidth > 900) {
        mobileMenu.value = false;
    }
};
const handleClick = (e) => {
    if (
        mobileMenu.value &&
        !e.target.closest("nav") &&
        !e.target.closest(".menu-btn")
    ) {
        closeMenu();
    }
}

onMounted(() => {
    document.addEventListener("click", handleClick);
})

onUnmounted(() => {
    document.removeEventListener("click", handleClick);
})

onMounted(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleScroll();
});

onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
/*************************
        NAVBAR
**************************/

.navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
    padding: 18px 0;
    background: transparent;
    transition:
        background .4s,
        backdrop-filter .4s,
        padding .4s,
        box-shadow .4s;
}

.navbar.scrolled {
    padding: 12px 0;
    background: rgba(15, 15, 15, .75);
    backdrop-filter: blur(22px);
    -webkit-backdrop-filter: blur(22px);
    border-bottom: 1px solid rgba(255, 255, 255, .08);
    box-shadow: 0 15px 35px rgba(0, 0, 0, .25);
}

/*************************
      CONTAINER
**************************/

.nav-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/*************************
        LOGO
**************************/

.brand {
    display: flex;
    align-items: center;
}

.logo{

width:90px;

height:90px;

border-radius:50%;

border:4px solid #d4af37;

object-fit:cover;

}

.logo.small {
    width: 72px;
    height: 72px;
}

.logo:hover {
    transform: scale(1.08);
}

/*************************
        NAVIGATION
**************************/

nav {
    display: flex;
    align-items: center;
    gap: 35px;
}

nav a {
    color: #fff;
    text-decoration: none;
    font-weight: 600;
    font-size: 15px;
    position: relative;
    transition: .3s;
}

nav a:hover {
    color: #C99732;
}

nav a::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: -8px;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: #C99732;
    transition: .3s;
}

nav a:hover::after,
nav a.router-link-active::after {
    width: 100%;
}

nav a.router-link-active {
    color: #C99732;
}


/*************************
        ACTIONS
**************************/

.actions {
    display: flex;
    align-items: center;
    gap: 18px;
}

/*************************
       LANG BUTTONS
**************************/

.lang {
    padding: 5px;
    border-radius: 50px;
    background: rgba(255, 255, 255, .06);
    backdrop-filter: blur(12px);
}

.lang button {
    padding: 8px 14px;
    border-radius: 30px;
    background: transparent;
}

.lang button.active {
    background: #C99732;
    color: #111;
}

.lang button:hover {
    background: #C99732;
}

/*************************
      MENU BUTTON
**************************/

.menu-btn {
    display: none;
    align-items: center;
    justify-content: center;

    width: 48px;
    height: 48px;

    border: none;
    border-radius: 10px;

    background: transparent;
    color: #fff;

    font-size: 28px;
    cursor: pointer;

    transition: .3s;
}

/*************************
      RESPONSIVE
**************************/

@media (max-width: 900px) {

    /*************************
          LOGO
    **************************/

    .logo {
        width: 70px;
        height: 70px;
    }

    /*************************
      BOUTON MENU
    **************************/

    .menu-btn {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 48px;
        height: 48px;

        border: none;
        border-radius: 10px;

        background: rgba(0, 0, 0, .45);
        backdrop-filter: blur(10px);

        color: #fff;
        font-size: 28px;
        cursor: pointer;

        position: relative;
        z-index: 2001;
    }

    .menu-btn:hover {
        background: #C99732;
        color: #111;
    }

    /*************************
          ACTIONS
    **************************/

    .actions {
        position: relative;
        z-index: 2001;
    }

    .brand {
        position: relative;
        z-index: 2001;
    }

    .lang {
        display: none;
    }

    /*************************
          MENU
    **************************/

    nav {
        position: fixed;
        top: 0;
        left: 0;

        width: 100%;
        height: 100vh;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 40px;

        background: rgba(17, 17, 17, .97);
        backdrop-filter: blur(20px);

        transform: translateX(-100%);
        transition: transform .45s ease;

        z-index: 2000;

        pointer-events: none;
    }

    nav.active {
        transform: translateX(0);
        pointer-events: auto;
    }

    /*************************
          LIENS
    **************************/

    nav a {
        color: white;
        font-size: 22px;
        font-weight: 600;

        opacity: 0;
        transform: translateY(-15px);
        animation: fadeIn .5s forwards;
    }

    nav a:nth-child(1) {
        animation-delay: .05s;
    }

    nav a:nth-child(2) {
        animation-delay: .1s;
    }

    nav a:nth-child(3) {
        animation-delay: .15s;
    }

    nav a:nth-child(4) {
        animation-delay: .2s;
    }

    nav a:nth-child(5) {
        animation-delay: .25s;
    }

    nav a:nth-child(6) {
        animation-delay: .3s;
    }

    @keyframes fadeIn {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
}
</style>