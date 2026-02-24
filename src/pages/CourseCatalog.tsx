import React, { useState, useMemo } from 'react';
import { Search, Filter, Code2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import CourseCard from '../components/CourseCard';
import { coursesData } from '../data/coursesData';
import { useNavigate } from 'react-router-dom';

export default function CourseCatalog() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'rating'>('popular');

  // Get unique categories and levels
  const categories = Array.from(new Set(coursesData.map(c => c.category)));
  const levels = Array.from(new Set(coursesData.map(c => c.level)));

  // Filter and search courses
  const filteredCourses = useMemo(() => {
    let filtered = coursesData;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        course =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    // Level filter
    if (selectedLevel) {
      filtered = filtered.filter(course => course.level === selectedLevel);
    }

    // Sort
    if (sortBy === 'rating') {
      filtered.sort((a, b) => (b.rating || 4.5) - (a.rating || 4.5));
    } else if (sortBy === 'newest') {
      filtered.sort((a, b) => (b.id as any) - (a.id as any));
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedLevel, sortBy]);

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <Code2 className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-foreground">Explore Courses</h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Discover and master 50+ professional programming courses. Start your learning journey today.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search and Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
          {/* Search */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <label className="text-sm font-bold text-foreground">Category</label>
            </div>
            <select
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground font-semibold appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%235b4efe' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                paddingRight: '2.5rem',
              }}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Level Filter */}
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <label className="text-sm font-bold text-foreground">Level</label>
            </div>
            <select
              value={selectedLevel || ''}
              onChange={(e) => setSelectedLevel(e.target.value || null)}
              className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground font-semibold appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%235b4efe' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                paddingRight: '2.5rem',
              }}
            >
              <option value="">All Levels</option>
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sort and Results Count */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <p className="text-muted-foreground font-semibold">
            Showing <span className="text-primary font-bold">{filteredCourses.length}</span> courses
          </p>
          <div className="flex items-center gap-2">
            <label className="text-sm font-bold text-foreground">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground font-semibold text-sm appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%235b4efe' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.5rem center',
                paddingRight: '2rem',
              }}
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCourses.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
                onClick={() => navigate(`/courses/${course.id}`)}
                className="cursor-pointer group"
              >
                <div className="h-full transition-all duration-300 ease-in-out group-hover:-translate-y-1">
                  <CourseCard course={course} onClick={() => navigate(`/courses/${course.id}`)} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center py-20"
          >
            <div className="inline-block mb-4">
              <Code2 className="w-16 h-16 text-muted-foreground/30" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">No courses found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search query</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
