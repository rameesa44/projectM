export default function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-4">
        
        {/* Icon */}
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}
        >
          {icon}
        </div>

        {/* Text */}
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {title}
          </p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </h3>
        </div>

      </div>
    </div>
  );
}
