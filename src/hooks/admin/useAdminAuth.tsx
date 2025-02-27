
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { logger } from "@/features/logging/logger";

export const useAdminAuth = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logger.info("auth", "AdminAuth useEffect:", {
      userId: user?.id,
      isAdmin: profile?.is_admin,
      loading
    });

    const checkAuth = async () => {
      if (!loading) {
        if (!user) {
          logger.system.info("auth", "Redirecionando usuário não autenticado", {
            path: "/admin-auth"
          });
          navigate("/admin-auth", { replace: true });
          return;
        }

        const isAdmin = profile?.is_admin ?? false;
        
        if (!isAdmin) {
          logger.system.warning("auth", "Tentativa de acesso não autorizado à área admin", {
            userId: user.id
          });
          navigate("/", { replace: true });
          return;
        }

        logger.system.info("auth", "Acesso admin autorizado", {
          userId: user.id
        });
      }
    };

    checkAuth();
  }, [user, profile, loading, navigate]);

  return {
    user,
    profile,
    loading,
    isAuthenticated: !!user,
    isAdmin: profile?.is_admin ?? false
  };
};
