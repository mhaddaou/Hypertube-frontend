"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import EditProfileModal from "@/components/profile/EditProfileModal";
import { resolveAvatarUrl } from "@/lib/avatar";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface UserData {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  profilePicture: string | null;
}

function readUserData(): UserData | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("user_data");
  if (!raw) return null;
  try {
    return JSON.parse(raw) as UserData;
  } catch {
    return null;
  }
}

const MOVIE_IMAGE =
  "https://img.yts.bz/assets/images/movies/fantasy_life_2025/medium-cover.jpg";

const MOVIES = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  title: "Rebel Moon - Part One: A Child of Fire",
  poster: MOVIE_IMAGE,
}));

type ProfileTab = "favorite" | "history";

export default function ProfilePage() {
  const [tab, setTab] = useState<ProfileTab>("favorite");
  const [user, setUser] = useState<UserData | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    setUser(readUserData());
  }, []);

  function handleSaved(next: UserData) {
    setUser(next);
    localStorage.setItem("user_data", JSON.stringify(next));
  }

  return (
    <div className="min-h-screen bg-auth-background text-primary-text">
      <ProfileTopBar avatar={resolveAvatarUrl(user?.profilePicture)} />
      <ProfileBanner />
      <ProfileSummary user={user} onEdit={() => setEditOpen(true)} />
      <ProfileTabs tab={tab} onChange={setTab} />
      <MovieGrid />

      {user && (
        <EditProfileModal
          open={editOpen}
          user={user}
          onClose={() => setEditOpen(false)}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}

interface ProfileTopBarProps {
  avatar: string;
}

function ProfileTopBar({ avatar }: ProfileTopBarProps) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    if (loggingOut) return;
    setLoggingOut(true);

    const accessToken = localStorage.getItem("access_token");

    try {
      if (accessToken) {
        await fetch(`${API_URL}/api/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
      }
    } catch {
      // Even if the network call fails, still clear local state below.
    }

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_data");

    toast.success("Logged out");
    router.replace("/signin");
  }

  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-white/5">
      <Link href="/" className="flex items-center">
        <Image src="/icons/logo.svg" alt="HyperTube" width={100} height={40} />
      </Link>

      <div className="flex items-center gap-5">
        <button
          type="button"
          className="cursor-pointer text-primary-text hover:text-primary transition-colors"
          aria-label="Search"
        >
          <Image src="/icons/search.svg" alt="Search" width={20} height={20} />
        </button>
        <button
          type="button"
          className="cursor-pointer text-primary-text hover:text-primary transition-colors"
          aria-label="Favorite"
        >
          <Image
            src="/icons/favorite.svg"
            alt="Favorite"
            width={20}
            height={20}
          />
        </button>
        <button
          type="button"
          aria-label="Avatar"
          className="cursor-pointer w-9 h-9 rounded-full overflow-hidden border border-primary/60"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatar}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </button>
        <Button
          variant="outline"
          onClick={handleLogout}
          loading={loggingOut}
          className="cursor-pointer border-primary text-primary bg-transparent hover:bg-primary/10 gap-2"
        >
          <LogOut size={16} />
          Logout
        </Button>
      </div>
    </header>
  );
}

function ProfileBanner() {
  return (
    <div className="relative z-0 h-48 md:h-56 w-full overflow-hidden">
      <Image
        src="/images/background.png"
        alt="Profile background"
        fill
        priority
        className="object-cover object-center z-10"
      />
    </div>
  );
}

interface ProfileSummaryProps {
  user: UserData | null;
  onEdit: () => void;
}

function ProfileSummary({ user, onEdit }: ProfileSummaryProps) {
  const fullName = user
    ? `${user.firstName} ${user.lastName}`.trim() || user.username
    : "...";
  const handle = user ? `@${user.username}` : "";
  const avatar = resolveAvatarUrl(user?.profilePicture);

  return (
    <div className="bg-auth-background px-8 pb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-5">
          <div className="relative z-10 -mt-14 w-28 h-28 rounded-full overflow-hidden border-4 border-primary shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatar}
              alt={fullName}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-primary-text font-semibold text-lg">
              {fullName}
            </p>
            <p className="text-primary text-sm">{handle}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={onEdit}
            disabled={!user}
            className="cursor-pointer border-primary text-primary bg-transparent hover:bg-primary/10 px-4 py-4.5"
          >
            Edit Profile
          </Button>
          <Button className="bg-primary hover:bg-primary/90 font-semibold text-white px-4 py-4.5">
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
}

interface ProfileTabsProps {
  tab: ProfileTab;
  onChange: (t: ProfileTab) => void;
}

function ProfileTabs({ tab, onChange }: ProfileTabsProps) {
  return (
    <div className="bg-primary px-6 py-2 flex justify-center gap-2">
      <button
        type="button"
        onClick={() => onChange("favorite")}
        className={`flex-1 max-w-xs py-2 rounded-md text-sm font-semibold transition-colors ${
          tab === "favorite"
            ? "bg-white/90 text-auth-background"
            : "text-primary-text hover:bg-white/10"
        }`}
      >
        Favorite
      </button>
      <button
        type="button"
        onClick={() => onChange("history")}
        className={`flex-1 max-w-xs py-2 rounded-md text-sm font-semibold transition-colors ${
          tab === "history"
            ? "bg-white/90 text-auth-background"
            : "text-primary-text hover:bg-white/10"
        }`}
      >
        History
      </button>
    </div>
  );
}

function MovieGrid() {
  return (
    <div className="px-8 py-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {MOVIES.map((m) => (
          <MovieCard key={m.id} title={m.title} poster={m.poster} />
        ))}
      </div>
    </div>
  );
}

interface MovieCardProps {
  title: string;
  poster: string;
}

function MovieCard({ title, poster }: MovieCardProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative aspect-2/3 rounded-lg overflow-hidden bg-black/40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={poster}
          alt={title}
          className="w-full h-full object-cover"
        />
        <button
          type="button"
          className="absolute bottom-2 right-2 hover:scale-110 transition-transform"
          aria-label="Favorite"
        >
          <Image
            src="/icons/favorite.svg"
            alt="Favorite"
            width={22}
            height={22}
          />
        </button>
      </div>
      <p className="text-primary text-sm font-semibold leading-snug line-clamp-2">
        {title}
      </p>
    </div>
  );
}
