-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    username TEXT UNIQUE,
    email TEXT UNIQUE,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    xp INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    streak INTEGER DEFAULT 0,
    enrolled_courses TEXT[] DEFAULT '{}',
    completed_lessons TEXT[] DEFAULT '{}',
    badges TEXT[] DEFAULT '{}',
    badges_count INTEGER DEFAULT 0,
    certificates JSONB[] DEFAULT '{}',
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to update badges_count
CREATE OR REPLACE FUNCTION update_badges_count()
RETURNS TRIGGER AS $$
BEGIN
    NEW.badges_count = array_length(NEW.badges, 1);
    IF NEW.badges_count IS NULL THEN
        NEW.badges_count = 0;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_update_badges_count ON public.profiles;
CREATE TRIGGER tr_update_badges_count
BEFORE INSERT OR UPDATE OF badges ON public.profiles
FOR EACH ROW EXECUTE FUNCTION update_badges_count();

-- Create courses table
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    category TEXT,
    level TEXT CHECK (level IN ('Beginner', 'Intermediate', 'Advanced')),
    duration TEXT,
    image_url TEXT,
    modules_count INTEGER DEFAULT 0,
    lessons_count INTEGER DEFAULT 0,
    xp_reward INTEGER DEFAULT 500,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create modules table
CREATE TABLE IF NOT EXISTS public.modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create lessons table
CREATE TABLE IF NOT EXISTS public.lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    module_id UUID REFERENCES public.modules(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    type TEXT CHECK (type IN ('explanation', 'practice', 'quiz', 'challenge')),
    content JSONB NOT NULL,
    xp_reward INTEGER DEFAULT 50,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public profiles are viewable by everyone') THEN
        CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can update own profile') THEN
        CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can insert own profile') THEN
        CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
    END IF;
END $$;

-- Courses Policies
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Courses are viewable by everyone') THEN
        CREATE POLICY "Courses are viewable by everyone" ON public.courses FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can manage courses') THEN
        CREATE POLICY "Admins can manage courses" ON public.courses FOR ALL USING (
            EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
        );
    END IF;
END $$;

-- Modules Policies
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Modules are viewable by everyone') THEN
        CREATE POLICY "Modules are viewable by everyone" ON public.modules FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can manage modules') THEN
        CREATE POLICY "Admins can manage modules" ON public.modules FOR ALL USING (
            EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
        );
    END IF;
END $$;

-- Lessons Policies
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Lessons are viewable by everyone') THEN
        CREATE POLICY "Lessons are viewable by everyone" ON public.lessons FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can manage lessons') THEN
        CREATE POLICY "Admins can manage lessons" ON public.lessons FOR ALL USING (
            EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
        );
    END IF;
END $$;

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_modules_course_id ON public.modules(course_id);
CREATE INDEX IF NOT EXISTS idx_lessons_module_id ON public.lessons(module_id);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_xp ON public.profiles(xp DESC);