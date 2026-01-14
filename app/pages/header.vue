<template>
  <header class="w-max-w-full font-sans container mx-auto">
    <div class="flex flex-1 h-auto">
      <!-- LOGO -->
      <div class="bg-[#e5c175] flex overflow-hidden flex-shrink-0">
        <div
          class="bg-black flex items-center justify-end px-6 lg:px-10 py-4 min-w-[180px] lg:min-w-[300px] rounded-tr-[60px]"
        >
          <span class="text-white text-xl lg:text-4xl">LOGO</span>
        </div>
      </div>

      <!-- RIGHT -->
      <div class="flex-1 flex flex-col">
        <!-- TOP BAR -->
        <div
          class="bg-[#e5c175] flex items-center px-6 py-2 relative justify-start w-full"
        >
          <!-- MAIN NAV -->
          <nav class="hidden lg:flex items-center gap-2 relative">
            <div
              v-for="item in mainNav"
              :key="item.id"
              class="relative group hover:bg-white/30 p-[1px] rounded-t-2xl"
            >
              <div
                class="flex w-[135px] items-center justify-center text-sm p-2 bg-[#e5c175] text-black font-semibold rounded-full hover:border hover:border-black hover:bg-gradient-to-b from-gray-700 to-black hover:text-[#e5c175] transition"
              >
                {{ item.label }}
              </div>

              <!-- DROPDOWN -->
              <div
                v-if="item.dropdown"
                class="absolute top-full left-0 w-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all"
              >
                <div class="backdrop-blur-3xl rounded-b-2xl p-2 shadow-xl">
                  <ul class="space-y-1">
                    <li v-for="sub in item.dropdown" :key="sub.id">
                      <NuxtLink
                        :to="sub.href"
                        class="flex items-center gap-3 p-2 rounded-full bg-white/30 text-gray-800 font-medium whitespace-nowrap"
                      >
                        <img :src="getIcon(sub.img)" class="w-6 h-6" />
                        {{ sub.title }}
                      </NuxtLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- REGISTER & LOGIN BUTTONS FOR NOT LOGGED IN -->
            <template v-if="!isLoggedIn">
              <div class="ml-4 flex gap-2">
                <button
                  class="bg-white px-4 py-1.5 rounded-full font-bold hover:bg-gray-100 transition"
                >
                  Register
                </button>
                <button
                  @click="login"
                  class="bg-[#2d2d2d] text-[#e5c175] px-4 py-1.5 rounded-full font-bold hover:bg-black hover:text-yellow-400 transition"
                >
                  Login
                </button>
              </div>
            </template>
          </nav>

          <!-- AUTH / USER PANEL (LOGGED IN) -->
          <div class="flex items-center justify-start gap-2 ml-auto">
            <template v-if="isLoggedIn">
              <div
                class="hidden lg:flex relative items-center gap-2 bg-gradient-to-b from-gray-700 to-black backdrop-blur-xl p-1 rounded-full"
              >
                <!-- COIN WRAPPER -->
                <div class="relative">
                  <!-- COIN BUTTON -->
                  <button
                    @click="toggleDropdown"
                    class="flex w-[130px] items-center gap-1 px-2 py-1 ml-1 bg-white text-black font-semibold rounded-full border border-black transition relative z-20"
                  >
                    <img src="/icons/coin.png" class="w-5 h-5" />
                    <span class="ml-2 text-sm">{{ coin }}</span>
                    <span
                      class="ml-auto text-lg w-5 h-5 flex items-center justify-center rounded-full bg-[#e5c175] border border-amber-500 text-black font-bold"
                    >
                      {{ isDropdownOpen ? "🗙" : "✚" }}
                    </span>
                  </button>

                  <!-- DROPDOWN -->
                  <div
                    v-show="isDropdownOpen"
                    class="absolute left-0 top-full w-full transition-all duration-200 z-10"
                  >
                    <div class="overflow-hidden rounded-b-2xl relative">
                      <div
                        class="absolute top-0 left-0 w-full h-full bg-[#e5c175] opacity-20"
                      ></div>
                      <div
                        class="backdrop-blur-3xl bg-gray-500/70 rounded-b-2xl shadow-2xl border border-white/10 p-2 space-y-2 relative z-10"
                      >
                        <button
                          v-for="item in coinOptions"
                          :key="item.id"
                          @click="addCoin(item.value)"
                          class="flex w-full items-center gap-2 px-3 py-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition"
                        >
                          <img :src="item.icon" class="w-5 h-5" />
                          <span class="text-sm">{{ item.value }}</span>
                        </button>

                        <button
                          class="flex items-center gap-2 px-3 py-2 rounded-full text-white"
                        >
                          <span
                            class="w-5 h-5 flex items-center justify-center rounded-full bg-[#e5c175] text-black font-bold"
                          >
                            ✚
                          </span>
                          <span class="text-xs font-medium">Nạp thêm</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- NOTIFICATION -->
                <button class="relative">
                  <img src="/icons/bell.png" class="w-6 h-6" />
                  <span
                    v-if="notificationCount"
                    class="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-red-600 text-[#e5c175] text-[10px] font-bold flex items-center justify-center"
                  >
                    {{ notificationCount }}
                  </span>
                </button>

                <!-- MAIL -->
                <button class="relative">
                  <img src="/icons/mail.png" class="w-6 h-6" />
                  <span
                    v-if="mailCount"
                    class="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-red-600 text-[#e5c175] text-[10px] font-bold flex items-center justify-center"
                  >
                    {{ mailCount }}
                  </span>
                </button>

                <!-- DATE -->
                <button>
                  <img src="/icons/date.png" class="w-6 h-6" />
                </button>

                <!-- AVATAR -->
                <div class="relative" ref="avatarWrapper">
                  <div
                    class="relative w-12 h-12 cursor-pointer"
                    @click="toggleAvatarDropdown"
                  >
                    <img
                      src="/icons/frame.png"
                      class="absolute inset-0 w-full"
                    />
                    <img
                      src="/icons/avatar.png"
                      class="w-8 rounded-full object-cover absolute inset-0 m-auto"
                    />
                    <span
                      class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-black text-[#e5c175] text-xs font-bold flex items-center justify-center border border-[#e5c175]"
                    >
                      {{ level }}
                    </span>
                  </div>

                  <!-- AVATAR DROPDOWN -->
                  <div
                    v-if="isAvatarDropdownOpen"
                    class="absolute right-0 top-full mt-2 w-44 bg-gray-800/80 backdrop-blur-3xl rounded-xl shadow-xl border border-white/10 p-2 z-20"
                  >
                    <button
                      v-for="item in useracc"
                      :key="item.title"
                      @click="goTo(item.href)"
                      class="flex items-center gap-2 w-full text-left px-3 py-2 rounded hover:bg-gray-700 transition"
                    >
                      <img :src="item.icon" class="w-5 h-5" />
                      <span class="text-sm">{{ item.title }}</span>
                    </button>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>

        <!-- SUB NAV + LANGUAGE/DARK TOGGLE -->
        <div class="bg-black px-6 py-2 flex items-center">
          <div class="flex items-center space-x-6 overflow-x-auto no-scrollbar">
            <div
              v-for="sub in subNav"
              :key="sub.id"
              class="flex items-center space-x-2 text-[#e5c175] text-sm hover:text-white cursor-pointer"
            >
              <img :src="getIcon(sub.icon)" class="w-5 h-5" />
              <span>{{ sub.label }}</span>
            </div>
          </div>

          <div class="flex items-center ml-4 gap-4">
            <button
              @click="toggleLanguage"
              class="flex items-center gap-2 px-3 py-1 rounded-full border border-[#e5c175] bg-white font-bold"
            >
              <img
                :src="
                  language === 'EN' ? getIcon('eng.png') : getIcon('vn.png')
                "
                class="w-6 h-6"
              />
              {{ language }}
            </button>

            <button
              @click="toggleDark"
              class="relative inline-flex h-8 w-14 items-center rounded-full border border-[#e5c175]"
            >
              <span
                class="inline-flex h-6 w-6 rounded-full transition-transform"
                :class="isDark ? 'translate-x-7' : 'translate-x-1'"
              >
                <img
                  :src="isDark ? getIcon('dark.png') : getIcon('light.png')"
                  class="w-6 h-6"
                />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MOBILE MENU -->
    <Transition name="fade">
      <div v-if="isMobileMenuOpen" class="lg:hidden bg-[#e5c175] p-4">
        <ul class="space-y-3 font-bold">
          <!-- REGISTER & LOGIN FOR MOBILE -->
          <li v-if="!isLoggedIn" class="flex gap-2 mb-4">
            <button class="flex-1 bg-white px-4 py-1.5 rounded-full font-bold">
              Register
            </button>
            <button
              @click="login"
              class="flex-1 bg-[#2d2d2d] text-[#e5c175] px-4 py-1.5 rounded-full font-bold"
            >
              Login
            </button>
          </li>

          <!-- USER INFO ON MOBILE -->
          <li v-if="isLoggedIn" class="mb-4">
            <div class="flex items-center gap-3 bg-white/40 rounded-xl p-3">
              <img src="/icons/coin.png" class="w-5 h-5" />
              <span class="font-bold">{{ coin }} Coins</span>
              <span class="ml-auto text-sm">Lv. {{ level }}</span>
            </div>
          </li>

          <li v-for="item in mainNav" :key="item.id">{{ item.label }}</li>
        </ul>
      </div>
    </Transition>
  </header>
  <!-- ================= COIN ================= -->
  <div
    class="relative rounded-t-2xl p-[1px] transition"
    :class="isCoinOpen ? 'bg-white/30 backdrop-blur-xl' : ''"
  >
    <button
      @click.stop="toggleCoinDropdown"
      class="flex w-[130px] items-center gap-1 px-2 py-1 ml-1 bg-white text-black font-semibold rounded-full border border-black transition-all relative z-20"
    >
      <img src="/icons/coin.png" class="w-5 h-5" />
      <span class="ml-2 text-sm">{{ coin }}</span>

      <span
        class="ml-auto w-5 h-5 flex items-center justify-center rounded-full bg-[#e5c175] border border-amber-500 text-black font-bold"
      >
        {{ isCoinOpen ? "🗙" : "✚" }}
      </span>
    </button>

    <!-- COIN DROPDOWN -->
    <div v-show="isCoinOpen" class="absolute left-0 top-full w-full z-30">
      <div class="overflow-hidden rounded-b-2xl relative">
        <div class="absolute inset-0 bg-white/20"></div>

        <div
          class="relative z-10 backdrop-blur-3xl bg-black/40 p-2 rounded-b-2xl border border-white/10 space-y-1"
        >
          <button
            v-for="item in coinOptions"
            :key="item.id"
            @click="handleAddCoin(item.value)"
            class="flex w-full items-center gap-2 px-3 py-2 rounded-full bg-white/20 backdrop-blur-lg text-white transition"
          >
            <img :src="item.icon" class="w-5 h-5" />
            <span class="text-sm">{{ item.value }}</span>
          </button>

          <button
            @click="handleAddMore"
            class="flex items-center gap-2 px-3 py-2 text-white"
          >
            <span
              class="w-5 h-5 flex items-center justify-center rounded-full bg-[#e5c175] text-black font-bold"
            >
              ✚
            </span>
            <span class="text-xs font-medium">Nạp thêm</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- ================= NOTIFICATION ================= -->
  <button class="relative">
    <img src="/icons/bell.png" class="w-6 h-6" />
    <span
      v-if="notificationCount"
      class="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-red-600 text-[#e5c175] text-[10px] font-bold flex items-center justify-center"
    >
      {{ notificationCount }}
    </span>
  </button>

  <!-- ================= MAIL ================= -->
  <button class="relative">
    <img src="/icons/mail.png" class="w-6 h-6" />
    <span
      v-if="mailCount"
      class="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-red-600 text-[#e5c175] text-[10px] font-bold flex items-center justify-center"
    >
      {{ mailCount }}
    </span>
  </button>

  <!-- ================= DATE ================= -->
  <button>
    <img src="/icons/date.png" class="w-6 h-6" />
  </button>
  <div
    class="absolute left-0 top-full w-full transition-all duration-300 origin-top"
    :class="
      isAvatarDropdownOpen
        ? 'opacity-100 visible translate-y-0 scale-100'
        : 'opacity-0 invisible -translate-y-2 scale-95'
    "
  >
    <div
      class="rounded-2xl bg-white/20 backdrop-blur-3xl border border-white/20 shadow-2xl p- space-y-2"
    >
      <button
        v-for="(item, index) in useracc"
        :key="item.title"
        @click="goTo(item.href)"
        :class="[
          'flex items-center gap-2 w-full px-4 py-3 rounded-full transition-colors backdrop-blur-md',
          index === 0
            ? 'bg-black text-[#e5c175] hover:bg-black/70'
            : 'bg-white/10 text-black hover:bg-white/20',
        ]"
      >
        <img :src="item.icon" class="w-5 h-5" />
        <span class="text-sm font-semibold">
          {{ item.title }}
        </span>
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, watch, onBeforeUnmount } from "vue";

/* ---------------- BASIC STATE ---------------- */
const isMobileMenuOpen = ref(false);
const language = ref("EN");
const isDark = ref(false);

/* ---------------- LOGIN STATE ---------------- */
const isLoggedIn = ref(false);
const coin = ref(1000);
const level = ref(20);
const notificationCount = ref(10);
const mailCount = ref(2);

/* ---------------- ACTIONS ---------------- */
const toggleLanguage = () => {
  language.value = language.value === "EN" ? "VI" : "EN";
};

const toggleDark = () => {
  isDark.value = !isDark.value;
};

const login = () => {
  isLoggedIn.value = true;
};

/* ✅ FIXED: addCoin now accepts value */
const addCoin = (value: number) => {
  coin.value += value;
};

/* ---------------- THEME PERSIST ---------------- */
onMounted(() => {
  const saved = localStorage.getItem("theme");
  isDark.value = saved === "dark";
});

watch(isDark, (val) => {
  const html = document.documentElement;
  if (val) {
    html.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    html.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
});

/* ---------------- NAV DATA ---------------- */
// const { data: navigation } = await useFetch("/api/navigation", {
//   server: true,
//   key: "nav",
//   default: () => ({
//     mainNav: [],
//     subNav: [],
//     coinOptions: [],
//   }),
// });

/* ✅ CLEAN COMPUTEDS */
const mainNav = computed(() => navigation.value?.mainNav || []);
const subNav = computed(() => navigation.value?.subNav || []);
const coinOptions = computed(() => navigation.value?.coinOptions || []);

/* ---------------- HELPERS ---------------- */
const getIcon = (name: string) => `/icons/${name}`;
/* ---------------- STATE ---------------- */
const isAvatarDropdownOpen = ref(false);

const avatarWrapper = ref<HTMLElement | null>(null);

/* ---------------- FETCH NAV DATA ---------------- */
const { data: navigation } = await useFetch("/api/navigation", {
  server: true,
  key: "nav",
  default: () => ({
    mainNav: [],
    subNav: [],
    useracc: [],
    coinOptions: [],
  }),
});

/* ---------------- COMPUTED USER ACCOUNT ---------------- */
const useracc = computed(() => navigation.value?.useracc || []);

/* ---------------- DROPDOWN TOGGLE ---------------- */
const toggleAvatarDropdown = () => {
  isAvatarDropdownOpen.value = !isAvatarDropdownOpen.value;
};

/* ---------------- CLICK OUTSIDE ---------------- */
const handleClickOutside = (event: MouseEvent) => {
  if (
    avatarWrapper.value &&
    !avatarWrapper.value.contains(event.target as Node)
  ) {
    isAvatarDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

/* ---------------- NAVIGATION FUNCTION ---------------- */
const goTo = (href: string) => {
  window.location.href = href; // or use router.push(href) if using Vue Router
};

/* ---------------- ACTIONS ---------------- */
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};
const isDropdownOpen = ref(false);
</script>
