import { supabase } from "./supabase";

export const signUp = async ({ name, email, password }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });
  return { data, error };
};

export const signIn = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
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
  const user = await getUser();
  const { error } = await supabase
    .from("profiles")
    .update({ gender })
    .eq("id", user.id);
  return { error };
};

export const saveHabits = async (habits) => {
  const user = await getUser();

  await supabase.from("habits").delete().eq("user_id", user.id);

  const { error } = await supabase.from("habits").insert(
    habits.map((h) => ({
      user_id: user.id,
      label: h.label,
      emoji: h.emoji,
    })),
  );
  return { error };
};
