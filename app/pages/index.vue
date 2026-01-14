<template>
  <header class="w-full font-sans bg-transparent">
    <!-- ================= DESKTOP HEADER ================= -->
    <div class="hidden md:flex flex-1 h-auto mx-auto w-full">
      <!-- LOGO -->
      <div class="bg-[#f3d26b] flex overflow-hidden flex-shrink-0">
        <div
          class="bg-black flex items-center justify-end px-6 lg:px-10 py-4 min-w-[160px] lg:min-w-[300px] rounded-tr-[60px]"
        >
          <span class="text-white text-xl lg:text-4xl">LOGO</span>
        </div>
      </div>

      <!-- Navigation -->
      <div class="flex-1 flex flex-col">
        <!-- TOP BAR -->
        <div
          class="bg-gradient-to-r from-[#f3d26b] to-[#e5c175] flex items-center justify-start relativew-full"
        >
          <!-- MAIN NAVIGATION -->
          <nav class="flex items-center gap-2 py-1 lg:py-4 relative">
            <div
              v-for="item in mainNav"
              :key="item.id"
              class="relative group rounded-t-2xl p-[1px] hover:bg-white/30 hover:backdrop-blur-xl focus-within:bg-white/30 focus-within:backdrop-blur-xl transition"
            >
              <!-- NAV ITEM -->
              <div
                tabindex="0"
                class="flex w-[98px] lg:w-[135px] items-center justify-center text-[12px] lg:text-sm p-1 lg:p-2 text-black font-semibold rounded-full transition-all duration-300 hover:bg-gradient-to-b hover:from-gray-700 hover:to-black hover:text-[#e5c175] hover:border hover:border-black focus:bg-gradient-to-b focus:from-gray-700 focus:to-black focus:text-[#e5c175] focus:border focus:border-black focus:outline-none"
              >
                {{ item.label }}
              </div>

              <!-- DROPDOWN -->
              <div
                v-if="item.dropdown"
                class="absolute top-full left-0 w-full opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 transition-all duration-300"
              >
                <div class="backdrop-blur-xl bg-white/30 rounded-b-2xl py-0.5">
                  <ul class="space-y-1">
                    <li v-for="sub in item.dropdown" :key="sub.id">
                      <NuxtLink
                        :to="sub.href"
                        class="flex items-center gap-3 p-1 lg:p-2 rounded-full bg-white/40 backdrop-blur-lg text-gray-800 font-medium whitespace-nowrap focus:bg-backdrop-blur-xl focus:text-[#e5c175] transition"
                      >
                        <img
                          :src="getIcon(sub.img)"
                          class="w-5 h-5 lg:w-6 lg:h-6"
                        />
                        <span class="text-[10px] lg:text-base">{{
                          sub.title
                        }}</span></NuxtLink
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- REGISTER & LOGIN -->
            <template v-if="!isLoggedIn">
              <div class="lg:ml-4 m-1 flex gap-2">
                <button
                  class="bg-white px-2 py-1 lg:px-4 lg:py-1.5 text-xs md:text-base rounded-full font-bold hover:bg-gray-100 transition"
                >
                  ĐĂNG KÝ
                </button>
                <button
                  @click="login"
                  class="text-[#e5c175] px-2 py-1 lg:px-4 lg:py-1.5 text-xs md:text-sm rounded-full font-bold bg-black hover:text-yellow-400 transition"
                >
                  ĐĂNG NHẬP
                </button>
              </div>
            </template>
          </nav>

          <!-- USER PANEL -->
          <div
            class="flex items-center justify-start gap-2 p-2 ml-2"
            v-if="isLoggedIn"
          >
            <div
              class="relative hidden md:flex flex-col items-center justify-center"
            >
              <!-- GREETING -->
              <span
                class="absolute -top-4 left-1/2 -translate-x-1/2 mt-1 text-[10px] tracking-wide text-black font-medium whitespace-nowrap"
              >
                Xin chào, NguyenVanDen
              </span>

              <!-- USER CONTROLS -->
              <div
                class="relative group flex items-center gap-2 bg-gradient-to-b from-gray-700 to-black rounded-full px- lg:px-3"
              >
                <!-- COIN -->
                <div
                  :class="[
                    'relative rounded-t-2xl p-[1px] transition',
                    isCoinOpen ? 'bg-white/30 backdrop-blur-xl' : '',
                  ]"
                >
                  <button
                    @click.stop="toggleCoinDropdown"
                    class="flex w-[85px] lg:w-[130px] items-center gap-1 px-2 py-1 ml-1 bg-white text-black font-semibold rounded-full border border-black transition-all relative z-20"
                  >
                    <img src="/icons/coin.png" class="w-4 lg:w-5 h-4 lg:h-5" />
                    <span class="ml-1 md:ml-2 text-xs lg:text-sm">{{
                      coin
                    }}</span>
                    <span
                      class="lg:ml-auto w-4 h-4 lg:w-5 lg:h-5 flex items-center justify-center rounded-full bg-[#e5c175] border border-amber-500 text-black font-bold text-xs lg:text-base"
                    >
                      {{ isCoinOpen ? "🗙" : "✚" }}
                    </span>
                  </button>

                  <!-- COIN DROPDOWN -->
                  <div
                    v-show="isCoinOpen"
                    class="absolute left-0 top-full w-full z-30"
                  >
                    <div class="overflow-hidden rounded-b-2xl relative">
                      <div class="absolute inset-0 bg-white/20"></div>
                      <div
                        class="relative z-10 backdrop-blur-3xl bg-black/40 p-2 rounded-b-2xl border border-white/10 space-y-1"
                      >
                        <button
                          v-for="item in coinOptions"
                          :key="item.id"
                          @click="handleAddCoin(item.value)"
                          class="flex w-full items-center gap-2 p-1 lg:px-3 lg:py-2 rounded-full bg-white/20 backdrop-blur-lg text-white transition text-sm md:text-base"
                        >
                          <img :src="item.icon" class="w-4 lg:w-5 h-4 lg:h-5" />
                          <span>{{ item.value }}</span>
                        </button>
                        <button
                          @click="handleAddMore"
                          class="flex items-center gap-2 lg:px-3 lg:py-2 text-white text-xs lg:text-sm"
                        >
                          <span
                            class="w-4 lg:w-5 h-4 lg:h-5 flex items-center justify-center rounded-full bg-[#e5c175] text-black font-bold text-xs lg:text-base"
                            >✚</span
                          >
                          <span class="font-medium">Nạp thêm</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- NOTIFICATIONS -->
                <button class="relative w-5 lg:w-6 h-5 lg:h-6">
                  <img src="/icons/bell.png" class="w-5 lg:w-6 h-5 lg:h-6" />
                  <span
                    v-if="notificationCount"
                    class="absolute -top-1 -right-1 min-w-[14px] lg:min-w-[16px] lg:h-4 px-1 rounded-full bg-red-600 text-[#e5c175] text-[9px] md:text-[10px] font-bold flex items-center justify-center"
                    >{{ notificationCount }}</span
                  >
                </button>

                <!-- MAIL -->
                <button class="relative w-6 md:w-6 h-6 md:h-6">
                  <img src="/icons/mail.png" class="w-5 lg:w-6 h-5 lg:h-6" />
                  <span
                    v-if="mailCount"
                    class="absolute -top-1 -right-1 min-w-[14px] lg:min-w-[16px] lg:h-4 px-1 rounded-full bg-red-600 text-[#e5c175] text-[9px] md:text-[10px] font-bold flex items-center justify-center"
                    >{{ mailCount }}</span
                  >
                </button>

                <!-- DATE -->
                <button>
                  <img src="/icons/date.png" class="w-5 lg:w-6 h-5 lg:h-6" />
                </button>

                <!-- AVATAR -->
                <button
                  class="relative w-10 lg:w-12 h-10 lg:h-12 flex-shrink-0"
                  @click="toggleAvatarDropdown"
                >
                  <img
                    src="/icons/frame.png"
                    class="absolute inset-0 w-full h-full"
                  />
                  <img
                    src="/icons/avatar.png"
                    class="w-7 lg:w-8 h-7 lg:h-8 rounded-full absolute inset-0 m-auto"
                  />
                  <span
                    class="absolute -bottom-1 -right-1 w-4 lg:w-5 h-4 lg:h-5 rounded-full bg-black text-[#e5c175] text-[10px] lg:text-xs font-bold flex items-center justify-center border border-[#e5c175]"
                    >{{ level }}</span
                  >
                </button>

                <!-- AVATAR DROPDOWN -->
                <div
                  class="absolute left-0 top-full w-full z-50 transition-all duration-300 origin-top"
                  :class="
                    isAvatarDropdownOpen
                      ? 'opacity-100 visible translate-y-0 scale-100'
                      : 'opacity-0 invisible -translate-y-2 scale-95'
                  "
                >
                  <div
                    class="rounded-2xl bg-white/20 backdrop-blur-3xl border border-white/20 space-y-2"
                  >
                    <button
                      v-for="(item, index) in useracc"
                      :key="item.title"
                      @click="goTo(item.href)"
                      :class="[
                        'flex items-center justify-start gap-2 w-full px-3 lg:px-4 py-2 lg:py-3 rounded-full transition-colors backdrop-blur-sm text-sm lg:text-base',
                        index === 0
                          ? 'bg-gradient-to-b from-gray-700 to-black text-[#e5c175] border border-black'
                          : 'bg-white/10 text-black',
                      ]"
                    >
                      <img
                        :src="item.icon"
                        class="w-4 lg:w-5 h-4 lg:h-5 ml-1 lg:ml-2"
                      />
                      <span class="font-semibold">{{ item.title }}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- SUB NAV + LANGUAGE/DARK TOGGLE -->
        <div
          class="bg-black px-2 sm:px-4 lg:px-6 py-2 flex flex-wrap items-center gap-3"
        >
          <!-- SUB NAV (START / LEFT) -->
          <div
            class="flex items-center space-x-3 overflow-x-auto no-scrollbar flex-1"
          >
            <div
              v-for="sub in subNav"
              :key="sub.id"
              class="flex-shrink-0 flex items-center space-x-2 text-[#e5c175] px-2 lg:px-3 py-1 rounded-full hover:text-white hover:bg-white/10 cursor-pointer transition"
            >
              <img :src="getIcon(sub.icon)" class="w-4 h-4 lg:w-5 lg:h-5" />
              <span class="text-[12px] lg:text-base font-medium truncate">
                {{ sub.label }}
              </span>
            </div>
          </div>

          <!-- LANGUAGE + DARK MODE TOGGLE -->
          <div class="flex items-center gap-2 sm:gap-4">
            <!-- Language Switch -->
            <button
              @click="toggleLanguage"
              class="flex items-center gap-2 px-2 lg:px-3 py-1 rounded-full border border-[#e5c175] bg-white font-bold"
            >
              <img
                :src="
                  language === 'English'
                    ? getIcon('eng.png')
                    : getIcon('vn.png')
                "
                class="w-5 lg:w-6 h-5 lg:h-6"
              />
              {{ language }}
            </button>

            <!-- Dark Mode Toggle -->
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
                  class="w-5 sm:w-6 h-5 sm:h-6"
                />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- MOBILE HEADER -->
    <!-- ================= MOBILE HEADER ================= -->
    <div class="md:hidden w-full flex items-stretch h-auto">
      <!-- ===== LEFT: FULL HEIGHT LOGO ===== -->
      <div class="bg-[#f3d26b] flex overflow-hidden flex-shrink-0">
        <div
          class="bg-black flex flex-col justify-start px-6 py-4 min-w-[200px] rounded-tr-[60px]"
        >
          <!-- Logo near the top-right curve -->
          <span class="text-white text-3xl font-bold mt-2">LOGO</span>
        </div>
      </div>

      <!-- ===== RIGHT: TOP + BOTTOM BARS ===== -->
      <div class="flex-1 flex flex-col">
        <!-- TOP BAR -->
        <div
          class="flex items-center justify-end bg-gradient-to-r from-[#f3d26b] to-[#e5c175] gap-4 py-2 px-4"
        >
          <!-- LANGUAGE -->
          <button
            @click="toggleLanguage"
            class="w-10 h-10 rounded-full bg-black text-[#f3d26b] font-bold text-base flex items-center justify-center"
          >
            {{ language }}
          </button>

          <!-- MENU -->
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="w-10 h-10 rounded-full bg-black flex items-center justify-center"
          >
            <img
              :src="getIcon('menu.png')"
              class="w-5 h-5 transition-transform duration-300"
            />
          </button>
        </div>

        <!-- BOTTOM BLACK BAR -->
        <div class="flex items-center justify-end bg-black py-1 px-5">
          <!-- ICONS -->
          <div class="flex items-center gap-6">
            <button
              v-for="item in mobileIcons"
              :key="item.id"
              class="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition"
            >
              <img :src="getIcon(item.img)" class="w-8 h-8 object-contain" />
            </button>
          </div>

          <!-- DARK MODE SWITCH -->
          <button
            @click="toggleDark"
            class="relative w-[56px] ml-4 h-8 rounded-full border-2 border-[#f3d26b] flex items-center px-1"
          >
            <span
              class="absolute w-6 h-6 rounded-full transition-transform duration-300"
              :class="isDark ? 'translate-x-6' : 'translate-x-0'"
            >
              <img
                :src="isDark ? getIcon('dark.png') : getIcon('light.png')"
                class="w-6 h-6"
              />
            </span>
          </button>
        </div>
      </div>

      <!-- ===== MOBILE MENU OVERLAY ===== -->
      <Transition name="fade">
        <div
          v-if="isMobileMenuOpen"
          class="fixed inset-0 z-40 bg-black/40"
          @click="isMobileMenuOpen = false"
        />
      </Transition>

      <!-- ===== MOBILE MENU PANEL ===== -->
      <Transition name="slide-right">
        <div
          v-if="isMobileMenuOpen"
          class="fixed top-0 right-0 z-50 w-[80%] max-w-xs h-full bg-black text-[#f3d26b] p-6"
        >
          <!-- HEADER -->
          <div class="flex items-center justify-between mb-6">
            <span class="text-xl font-bold">MENU</span>
            <button
              @click="isMobileMenuOpen = false"
              class="w-9 h-9 rounded-full bg-[#f3d26b] flex items-center justify-center"
            >
              <span class="text-black text-xl font-bold">×</span>
            </button>
          </div>

          <!-- NAV ITEMS -->
          <ul class="space-y-4 text-lg font-semibold">
            <li
              v-for="item in mainNav"
              :key="item.id"
              @click="
                goTo(item.href);
                isMobileMenuOpen = false;
              "
              class="cursor-pointer border-b border-[#f3d26b]/30 pb-2 hover:text-white transition"
            >
              {{ item.label }}
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  </header>
  <div
    class="md:bg-red-200 lg:bg-blue-200 xl:bg-green-200 2xl:bg-purple-200 h-48 w-full"
  ></div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, onBeforeUnmount } from "vue";

/* ---------------- STATE ---------------- */
const isMobileMenuOpen = ref(false);
const language = ref("EN");
const isDark = ref(false);
const isLoggedIn = ref(false);
const coin = ref(1000);
const level = ref(20);
const notificationCount = ref(10);
const mailCount = ref(2);
const isAvatarDropdownOpen = ref(false);
const isCoinOpen = ref(false);
const mainNav = computed(() => navigation.value?.mainNav || []);
const subNav = computed(() => navigation.value?.subNav || []);
const coinOptions = computed(() => navigation.value?.coinOptions || []);
const useracc = computed(() => navigation.value?.useracc || []);

/* ---------------- NAV DATA ---------------- */
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
const mobileIcons = computed(() => {
  return mainNav.value?.[0]?.dropdown?.slice(0, 3) || [];
});

/* ---------------- HELPERS ---------------- */
const getIcon = (name: string) => `/icons/${name}`;

/* ---------------- ACTIONS ---------------- */
const toggleLanguage = () =>
  (language.value = language.value === "English" ? "TIẾNG VIỆT" : "English  ");
const toggleDark = () => (isDark.value = !isDark.value);
const login = () => (isLoggedIn.value = true);

const toggleAvatarDropdown = () =>
  (isAvatarDropdownOpen.value = !isAvatarDropdownOpen.value);
const toggleCoinDropdown = () => (isCoinOpen.value = !isCoinOpen.value);
const handleAddCoin = (value: number) => {
  coin.value += value;
  isCoinOpen.value = false;
};
const handleAddMore = () => {
  console.log("Add more coins");
  isCoinOpen.value = false;
};
const goTo = (href: string) => (window.location.href = href);

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

/* ---------------- CLICK OUTSIDE ---------------- */
const handleClickOutside = (e: MouseEvent) => {
  if (!(e.target as HTMLElement).closest(".relative")) {
    isCoinOpen.value = false;
    isAvatarDropdownOpen.value = false;
  }
};

onMounted(() => document.addEventListener("click", handleClickOutside));
onBeforeUnmount(() =>
  document.removeEventListener("click", handleClickOutside)
);
</script>
