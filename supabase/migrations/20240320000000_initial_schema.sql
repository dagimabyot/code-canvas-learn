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
    certificates JSONB[] DEFAULT '{}',
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

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
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Courses Policies
CREATE POLICY "Courses are viewable by everyone" ON public.courses
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage courses" ON public.courses
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Modules Policies
CREATE POLICY "Modules are viewable by everyone" ON public.modules
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage modules" ON public.modules
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Lessons Policies
CREATE POLICY "Lessons are viewable by everyone" ON public.lessons
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage lessons" ON public.lessons
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_modules_course_id ON public.modules(course_id);
CREATE INDEX IF NOT EXISTS idx_lessons_module_id ON public.lessons(module_id);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);