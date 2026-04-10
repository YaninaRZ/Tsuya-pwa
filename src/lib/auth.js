import { supabase } from "./supabase";

export const signUp = async ({ name, email, password }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });
  if (data?.user) {
    localStorage.setItem("tsuya_user_id", data.user.id);
  }
  return { data, error };
};

export const signIn = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (data?.user) {
    localStorage.setItem("tsuya_user_id", data.user.id);
  }
  return { data, error };
};
export const resetPassword = async (email) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  return { error };
};

export const signOut = async () => {
  localStorage.removeItem("tsuya_user_id");
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};

export const saveGender = async (gender) => {
  const userId = localStorage.getItem("tsuya_user_id");
  if (!userId) return { error: "Non connecté" };

  const { error } = await supabase
    .from("profiles")
    .update({ gender })
    .eq("id", userId);
  return { error };
};

export const saveHabits = async (habits) => {
  const userId = localStorage.getItem("tsuya_user_id");
  if (!userId) return { error: "Non connecté" };

  await supabase.from("habits").delete().eq("user_id", userId);

  const { error } = await supabase.from("habits").insert(
    habits.map((h) => ({
      user_id: userId,
      label: h.label,
      emoji: h.emoji,
      description: h.description,
      frequency: h.frequency,
      target_value: h.target_value,
      target_unit: h.target_unit,
      image_url: h.image_url,
      color: h.color,
    })),
  );
  return { error };
};
